from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
import pymongo

from app.db.mongodb import db
from app.schemas.appointment import Appointment, AppointmentCreate, AppointmentUpdate
from app.auth.jwt import get_current_user, TokenData

router = APIRouter(
    prefix="/appointments",
    tags=["appointments"],
    responses={404: {"description": "Not found"}},
)

# Helper function to convert MongoDB document to Appointment schema
def appointment_helper(appointment) -> dict:
    return {
        "id": str(appointment["_id"]),
        "userId": str(appointment["userId"]) if appointment.get("userId") else None,
        "carId": str(appointment["carId"]) if appointment.get("carId") else None,
        "appointmentType": appointment["appointmentType"],
        "appointmentDate": appointment["appointmentDate"],
        "status": appointment["status"],
        "notes": appointment.get("notes"),
        "contactDetails": appointment["contactDetails"],
        "createdAt": appointment.get("createdAt", datetime.now()),
        "updatedAt": appointment.get("updatedAt", datetime.now())
    }

@router.get("/", response_model=List[Appointment])
async def get_appointments(
    status: Optional[str] = None,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Get all appointments for the current authenticated user
    """
    # Build query based on params
    query = {"userId": current_user.userId}
    if status:
        query["status"] = status
    
    appointments_collection = db.appointments
    
    # Find appointments and populate the car info
    cursor = appointments_collection.find(query).sort("appointmentDate", pymongo.ASCENDING)
    appointments = await cursor.to_list(None)
    
    # Get the car details for each appointment
    cars_collection = db.cars
    result_appointments = []
    
    for appointment in appointments:
        appt = appointment_helper(appointment)
        # You could populate more car data here if needed
        result_appointments.append(appt)
    
    return result_appointments

@router.post("/", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate, current_user: Optional[TokenData] = None):
    """
    Create a new appointment
    """
    appointment_dict = appointment.dict()
    
    # If a user is authenticated, associate the appointment with them
    if current_user:
        appointment_dict["userId"] = current_user.userId
    
    appointment_dict["createdAt"] = datetime.now()
    appointment_dict["updatedAt"] = appointment_dict["createdAt"]
    
    # Convert strings to ObjectId where needed
    if appointment_dict.get("userId"):
        appointment_dict["userId"] = ObjectId(appointment_dict["userId"])
    if appointment_dict.get("carId"):
        appointment_dict["carId"] = ObjectId(appointment_dict["carId"])
    
    appointments_collection = db.appointments
    result = await appointments_collection.insert_one(appointment_dict)
    
    if result.inserted_id:
        new_appointment = await appointments_collection.find_one({"_id": result.inserted_id})
        return appointment_helper(new_appointment)
    
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Failed to create appointment"
    )

@router.get("/{appointment_id}", response_model=Appointment)
async def get_appointment(
    appointment_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Get a specific appointment by ID
    """
    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid appointment ID format"
        )
    
    appointments_collection = db.appointments
    appointment = await appointments_collection.find_one({
        "_id": ObjectId(appointment_id),
        "userId": current_user.userId
    })
    
    if appointment:
        return appointment_helper(appointment)
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Appointment not found"
    )

@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(
    appointment_id: str,
    appointment_update: AppointmentUpdate,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Update a specific appointment
    """
    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid appointment ID format"
        )
    
    appointments_collection = db.appointments
    
    # Check if appointment exists and belongs to user
    existing_appointment = await appointments_collection.find_one({
        "_id": ObjectId(appointment_id),
        "userId": current_user.userId
    })
    
    if not existing_appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or you don't have permission to update it"
        )
    
    # Filter out None values
    update_data = {k: v for k, v in appointment_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.now()
    
    result = await appointments_collection.update_one(
        {"_id": ObjectId(appointment_id)},
        {"$set": update_data}
    )
    
    if result.modified_count:
        updated_appointment = await appointments_collection.find_one({"_id": ObjectId(appointment_id)})
        return appointment_helper(updated_appointment)
    
    # If nothing was modified but document exists
    if result.matched_count:
        return appointment_helper(existing_appointment)
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Appointment not found"
    )

@router.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_appointment(
    appointment_id: str,
    current_user: TokenData = Depends(get_current_user)
):
    """
    Delete a specific appointment
    """
    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid appointment ID format"
        )
    
    appointments_collection = db.appointments
    
    result = await appointments_collection.delete_one({
        "_id": ObjectId(appointment_id),
        "userId": current_user.userId
    })
    
    if not result.deleted_count:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found or you don't have permission to delete it"
        )