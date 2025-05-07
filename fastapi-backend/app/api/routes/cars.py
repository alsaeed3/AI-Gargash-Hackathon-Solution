from fastapi import APIRouter, HTTPException, status, Query, Depends
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorCollection
import pymongo

from app.db.mongodb import db
from app.schemas.car import Car, CarCreate, CarUpdate, CarFilter
from app.auth.jwt import get_current_user

router = APIRouter(
    prefix="/cars",
    tags=["cars"],
    responses={404: {"description": "Not found"}},
)

# Helper function to convert MongoDB document to Car schema
def car_helper(car) -> dict:
    return {
        "id": str(car["_id"]),
        "brand": car["brand"],
        "model": car["model"],
        "year": car["year"],
        "price": car["price"],
        "bodyType": car["bodyType"],
        "fuelType": car["fuelType"],
        "transmission": car["transmission"],
        "color": car["color"],
        "mileage": car["mileage"],
        "engineCapacity": car["engineCapacity"],
        "horsepower": car.get("horsepower"),
        "features": car.get("features", []),
        "description": car["description"],
        "imageUrl": car["imageUrl"],
        "additionalImages": car.get("additionalImages", []),
        "availability": car["availability"],
        "popularityScore": car.get("popularityScore", 0),
        "createdAt": car.get("createdAt", datetime.now()),
        "updatedAt": car.get("updatedAt", datetime.now())
    }

@router.get("/", response_model=List[Car])
async def get_cars(
    brand: Optional[str] = None,
    bodyType: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    fuelType: Optional[str] = None,
):
    """
    Get all cars with optional filtering.
    """
    query = {}
    
    # Apply filters if provided
    if brand:
        query["brand"] = {"$regex": brand, "$options": "i"}
    if bodyType:
        query["bodyType"] = bodyType
    if fuelType:
        query["fuelType"] = fuelType
    
    # Price range
    if minPrice is not None or maxPrice is not None:
        query["price"] = {}
        if minPrice is not None:
            query["price"]["$gte"] = minPrice
        if maxPrice is not None:
            query["price"]["$lte"] = maxPrice
    
    cars_collection = db.cars
    cursor = cars_collection.find(query).sort("popularityScore", pymongo.DESCENDING)
    cars = await cursor.to_list(None)
    
    return [car_helper(car) for car in cars]

@router.post("/", response_model=Car, status_code=status.HTTP_201_CREATED)
async def create_car(car: CarCreate):
    """
    Create a new car.
    """
    car_dict = car.dict()
    car_dict["createdAt"] = datetime.now()
    car_dict["updatedAt"] = car_dict["createdAt"]
    
    cars_collection = db.cars
    result = await cars_collection.insert_one(car_dict)
    
    if result.inserted_id:
        new_car = await cars_collection.find_one({"_id": result.inserted_id})
        return car_helper(new_car)
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create car")

@router.get("/{car_id}", response_model=Car)
async def get_car(car_id: str):
    """
    Get a specific car by ID.
    """
    if not ObjectId.is_valid(car_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid car ID format")
    
    cars_collection = db.cars
    car = await cars_collection.find_one({"_id": ObjectId(car_id)})
    
    if car:
        return car_helper(car)
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Car not found")

@router.put("/{car_id}", response_model=Car)
async def update_car(car_id: str, car_update: CarUpdate):
    """
    Update a specific car.
    """
    if not ObjectId.is_valid(car_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid car ID format")
    
    cars_collection = db.cars
    
    # Filter out None values
    update_data = {k: v for k, v in car_update.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.now()
    
    result = await cars_collection.update_one(
        {"_id": ObjectId(car_id)},
        {"$set": update_data}
    )
    
    if result.matched_count:
        updated_car = await cars_collection.find_one({"_id": ObjectId(car_id)})
        return car_helper(updated_car)
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Car not found")

@router.delete("/{car_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_car(car_id: str):
    """
    Delete a specific car.
    """
    if not ObjectId.is_valid(car_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid car ID format")
    
    cars_collection = db.cars
    result = await cars_collection.delete_one({"_id": ObjectId(car_id)})
    
    if not result.deleted_count:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Car not found")