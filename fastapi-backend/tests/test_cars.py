import pytest
from fastapi.testclient import TestClient
import json
from bson import ObjectId

# Test car endpoints
def test_get_cars(test_client):
    """Test retrieving all cars"""
    response = test_client.get("/api/cars")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert len(data["data"]) > 0

def test_get_cars_with_filters(test_client):
    """Test retrieving cars with filter parameters"""
    response = test_client.get("/api/cars?brand=Mercedes&bodyType=sedan")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    
    # Check filter results if any cars match
    if data["data"]:
        car = data["data"][0]
        assert car["brand"] == "Mercedes"
        assert car["bodyType"] == "sedan"

def test_get_car_by_id(test_client, db_test):
    """Test retrieving a specific car by ID"""
    # Get a car ID from the test database
    car = db_test.cars.find_one({})
    car_id = str(car["_id"])
    
    response = test_client.get(f"/api/cars/{car_id}")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert data["data"]["id"] == car_id
    assert data["data"]["brand"] == car["brand"]
    assert data["data"]["model"] == car["model"]

def test_get_car_invalid_id(test_client):
    """Test retrieving a car with invalid ID"""
    response = test_client.get("/api/cars/invalidid")
    assert response.status_code == 400
    assert "Invalid car ID format" in response.json()["detail"]

def test_create_car(test_client):
    """Test creating a new car"""
    new_car = {
        "brand": "BMW",
        "model": "X5",
        "year": 2023,
        "price": 75000,
        "bodyType": "suv",
        "fuelType": "hybrid",
        "transmission": "automatic",
        "color": "White",
        "mileage": 0,
        "engineCapacity": 3.0,
        "horsepower": 389,
        "features": ["leather", "navigation", "panoramic roof"],
        "description": "Luxury SUV with hybrid technology",
        "imageUrl": "https://example.com/bmw-x5.jpg",
        "availability": True,
        "popularityScore": 8
    }
    
    response = test_client.post("/api/cars", json=new_car)
    assert response.status_code == 201
    data = response.json()
    assert "data" in data
    assert data["data"]["brand"] == "BMW"
    assert data["data"]["model"] == "X5"
    
    # Verify the car was added to the database
    car_id = data["data"]["id"]
    get_response = test_client.get(f"/api/cars/{car_id}")
    assert get_response.status_code == 200

def test_update_car(test_client, db_test):
    """Test updating a car"""
    # Get a car ID from the test database
    car = db_test.cars.find_one({})
    car_id = str(car["_id"])
    
    update_data = {
        "price": 95000,
        "color": "Silver",
        "popularityScore": 12
    }
    
    response = test_client.put(f"/api/cars/{car_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert data["data"]["price"] == 95000
    assert data["data"]["color"] == "Silver"
    assert data["data"]["popularityScore"] == 12

def test_delete_car(test_client):
    """Test deleting a car"""
    # Create a car first
    new_car = {
        "brand": "Audi",
        "model": "A8",
        "year": 2023,
        "price": 85000,
        "bodyType": "sedan",
        "fuelType": "gasoline",
        "transmission": "automatic",
        "color": "Black",
        "mileage": 0,
        "engineCapacity": 4.0,
        "features": ["leather"],
        "description": "Luxury sedan",
        "imageUrl": "https://example.com/audi-a8.jpg",
        "availability": True,
        "popularityScore": 7
    }
    
    create_response = test_client.post("/api/cars", json=new_car)
    car_id = create_response.json()["data"]["id"]
    
    # Now delete the car
    delete_response = test_client.delete(f"/api/cars/{car_id}")
    assert delete_response.status_code == 204
    
    # Verify the car was deleted
    get_response = test_client.get(f"/api/cars/{car_id}")
    assert get_response.status_code == 404