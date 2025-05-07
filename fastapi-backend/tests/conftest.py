import pytest
import asyncio
import os
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from bson import ObjectId
from typing import Dict, Any

from app.main import app
from app.db.mongodb import db, connect_to_mongo, close_mongo_connection

# Set test environment variables
os.environ["DATABASE_NAME"] = "gargash_test"
os.environ["MONGO_URI"] = "mongodb://localhost:27017"

# Test client for FastAPI
@pytest.fixture(scope="module")
def test_client():
    with TestClient(app) as client:
        yield client

# Mock test DB setup
@pytest.fixture(scope="module")
async def db_test():
    # Use a test database
    client = AsyncIOMotorClient(os.environ["MONGO_URI"])
    test_db = client[os.environ["DATABASE_NAME"]]
    
    # Clear database before tests
    await clear_test_db(test_db)
    
    # Insert test data
    await populate_test_data(test_db)
    
    yield test_db
    
    # Cleanup after tests
    await clear_test_db(test_db)
    client.close()

# Helper functions for database setup
async def clear_test_db(db):
    """Clear all collections in test database"""
    collections = await db.list_collection_names()
    for collection in collections:
        await db[collection].delete_many({})

async def populate_test_data(db):
    """Populate test database with sample data"""
    # Create test user
    user_id = ObjectId()
    await db.users.insert_one({
        "_id": user_id,
        "name": "Test User",
        "email": "test@example.com",
        "phone": "1234567890",
        "preferences": {
            "brands": ["Mercedes", "BMW"],
            "bodyTypes": ["sedan", "suv"],
            "priceRange": {
                "min": 50000,
                "max": 100000
            },
            "fuelTypes": ["gasoline", "electric"],
            "features": ["leather", "navigation"]
        },
        "interactionHistory": [],
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    })
    
    # Create test cars
    car_id = ObjectId()
    await db.cars.insert_one({
        "_id": car_id,
        "brand": "Mercedes",
        "model": "S-Class",
        "year": 2023,
        "price": 90000,
        "bodyType": "sedan",
        "fuelType": "gasoline",
        "transmission": "automatic",
        "color": "Black",
        "mileage": 0,
        "engineCapacity": 3.0,
        "horsepower": 429,
        "features": ["leather", "navigation", "parking assist", "heated seats"],
        "description": "Luxury sedan with premium features",
        "imageUrl": "https://example.com/s-class.jpg",
        "additionalImages": [],
        "availability": True,
        "popularityScore": 10,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    })
    
    # Create test appointment
    await db.appointments.insert_one({
        "_id": ObjectId(),
        "userId": user_id,
        "carId": car_id,
        "appointmentType": "test-drive",
        "appointmentDate": datetime.now(),
        "status": "scheduled",
        "notes": "Test appointment",
        "contactDetails": {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890"
        },
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    })