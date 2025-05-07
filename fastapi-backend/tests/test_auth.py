import pytest
from fastapi.testclient import TestClient
import re

# Test authentication endpoints
def test_register(test_client):
    """Test user registration"""
    user_data = {
        "name": "New Test User",
        "email": "newuser@example.com",
        "phone": "9876543210"
    }
    
    response = test_client.post("/api/auth/register", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "user" in data["data"]
    assert data["data"]["user"]["name"] == "New Test User"
    assert data["data"]["user"]["email"] == "newuser@example.com"
    
    # Check if auth token cookie was set
    assert "authToken" in response.cookies

def test_register_existing_user(test_client):
    """Test registering with an existing email"""
    # Register a user
    user_data = {
        "name": "First User",
        "email": "first@example.com",
        "phone": "1112223333"
    }
    test_client.post("/api/auth/register", json=user_data)
    
    # Try to register again with the same email
    response = test_client.post("/api/auth/register", json=user_data)
    assert response.status_code == 400
    data = response.json()
    assert data["success"] is False
    assert "User with this email already exists" in data["detail"]

def test_login(test_client):
    """Test user login"""
    # First register a user
    user_data = {
        "name": "Login Test",
        "email": "login@example.com",
        "phone": "5556667777"
    }
    test_client.post("/api/auth/register", json=user_data)
    
    # Now try to login
    login_data = {
        "email": "login@example.com"
    }
    
    response = test_client.post("/api/auth/login", json=login_data)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "user" in data["data"]
    assert data["data"]["user"]["email"] == "login@example.com"
    
    # Check if auth token cookie was set
    assert "authToken" in response.cookies

def test_login_invalid_email(test_client):
    """Test login with non-existent email"""
    login_data = {
        "email": "nonexistent@example.com"
    }
    
    response = test_client.post("/api/auth/login", json=login_data)
    assert response.status_code == 404
    data = response.json()
    assert data["success"] is False
    assert "User not found" in data["detail"]

def test_logout(test_client):
    """Test user logout"""
    # First login
    login_data = {
        "email": "test@example.com"
    }
    test_client.post("/api/auth/login", json=login_data)
    
    # Now logout
    response = test_client.post("/api/auth/logout")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    # Check that the auth token cookie was cleared
    assert "authToken" in response.cookies
    assert response.cookies["authToken"] == ""