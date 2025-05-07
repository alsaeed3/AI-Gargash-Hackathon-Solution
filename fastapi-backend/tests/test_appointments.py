import pytest
from fastapi.testclient import TestClient
import json
from datetime import datetime, timedelta
from bson import ObjectId

# Test appointments endpoints
def test_create_appointment(test_client, db_test):
    """Test creating a new appointment"""
    # First, get a car ID to use
    car = db_test.cars.find_one({})
    car_id = str(car["_id"])
    
    # Create test appointment data
    appointment_date = datetime.now() + timedelta(days=3)
    appointment_data = {
        "appointmentType": "test-drive",
        "appointmentDate": appointment_date.isoformat(),
        "status": "scheduled",
        "carId": car_id,
        "notes": "Looking forward to test driving this model",
        "contactDetails": {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890"
        }
    }
    
    response = test_client.post("/api/appointments", json=appointment_data)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] is not None
    assert data["appointmentType"] == "test-drive"
    assert data["status"] == "scheduled"
    assert data["carId"] == car_id

def test_get_appointments_unauthorized(test_client):
    """Test getting appointments without authentication"""
    response = test_client.get("/api/appointments")
    assert response.status_code == 401  # Unauthorized

def test_get_appointments_with_auth(test_client):
    """Test getting appointments with authentication"""
    # First login
    login_data = {"email": "test@example.com"}
    login_response = test_client.post("/api/auth/login", json=login_data)
    cookies = login_response.cookies
    
    # Get appointments with auth cookies
    response = test_client.get("/api/appointments", cookies=cookies)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_get_appointment_by_id(test_client, db_test):
    """Test getting a specific appointment by ID with authentication"""
    # First login
    login_data = {"email": "test@example.com"}
    login_response = test_client.post("/api/auth/login", json=login_data)
    cookies = login_response.cookies
    
    # Get user ID from test database
    user = db_test.users.find_one({"email": "test@example.com"})
    user_id = str(user["_id"])
    
    # Find an appointment for this user
    appointment = db_test.appointments.find_one({"userId": ObjectId(user_id)})
    
    if appointment:
        appointment_id = str(appointment["_id"])
        response = test_client.get(f"/api/appointments/{appointment_id}", cookies=cookies)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == appointment_id
    else:
        # Create an appointment if none exists
        car = db_test.cars.find_one({})
        car_id = str(car["_id"])
        
        appointment_date = datetime.now() + timedelta(days=3)
        appointment_data = {
            "appointmentType": "test-drive",
            "appointmentDate": appointment_date.isoformat(),
            "carId": car_id,
            "notes": "Created during test",
            "contactDetails": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "1234567890"
            }
        }
        
        create_response = test_client.post("/api/appointments", json=appointment_data, cookies=cookies)
        appointment_id = create_response.json()["id"]
        
        response = test_client.get(f"/api/appointments/{appointment_id}", cookies=cookies)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == appointment_id

def test_update_appointment(test_client, db_test):
    """Test updating an appointment"""
    # First login
    login_data = {"email": "test@example.com"}
    login_response = test_client.post("/api/auth/login", json=login_data)
    cookies = login_response.cookies
    
    # Get user ID from test database
    user = db_test.users.find_one({"email": "test@example.com"})
    user_id = str(user["_id"])
    
    # Find an appointment for this user or create one
    appointment = db_test.appointments.find_one({"userId": ObjectId(user_id)})
    
    if not appointment:
        # Create an appointment if none exists
        car = db_test.cars.find_one({})
        car_id = str(car["_id"])
        
        appointment_date = datetime.now() + timedelta(days=3)
        appointment_data = {
            "appointmentType": "test-drive",
            "appointmentDate": appointment_date.isoformat(),
            "carId": car_id,
            "notes": "Created during test",
            "contactDetails": {
                "name": "Test User",
                "email": "test@example.com",
                "phone": "1234567890"
            }
        }
        
        create_response = test_client.post("/api/appointments", json=appointment_data, cookies=cookies)
        appointment_id = create_response.json()["id"]
    else:
        appointment_id = str(appointment["_id"])
    
    # Update the appointment
    new_date = (datetime.now() + timedelta(days=5)).isoformat()
    update_data = {
        "appointmentDate": new_date,
        "status": "confirmed",
        "notes": "Updated during test"
    }
    
    response = test_client.put(f"/api/appointments/{appointment_id}", json=update_data, cookies=cookies)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == appointment_id
    assert data["status"] == "confirmed"
    assert data["notes"] == "Updated during test"
    
def test_delete_appointment(test_client):
    """Test deleting an appointment"""
    # First login
    login_data = {"email": "test@example.com"}
    login_response = test_client.post("/api/auth/login", json=login_data)
    cookies = login_response.cookies
    
    # Create a new appointment to delete
    appointment_date = datetime.now() + timedelta(days=7)
    appointment_data = {
        "appointmentType": "consultation",
        "appointmentDate": appointment_date.isoformat(),
        "status": "scheduled",
        "notes": "To be deleted",
        "contactDetails": {
            "name": "Delete Test",
            "email": "delete@example.com",
            "phone": "9999999999"
        }
    }
    
    create_response = test_client.post("/api/appointments", json=appointment_data, cookies=cookies)
    appointment_id = create_response.json()["id"]
    
    # Now delete it
    delete_response = test_client.delete(f"/api/appointments/{appointment_id}", cookies=cookies)
    assert delete_response.status_code == 204
    
    # Verify it's deleted
    get_response = test_client.get(f"/api/appointments/{appointment_id}", cookies=cookies)
    assert get_response.status_code == 404