import pytest
from fastapi.testclient import TestClient
import json

# Test AI assistant endpoints
def test_ai_chat_without_auth(test_client):
    """Test AI assistant chat without authentication"""
    chat_data = {
        "message": "I'm looking for a luxury sedan"
    }
    
    response = test_client.post("/api/ai", json=chat_data)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "text" in data["data"]
    # Response should mention recommendations for luxury sedan
    assert any(keyword in data["data"]["text"].lower() for keyword in ["recommend", "suggest", "option"])

def test_ai_chat_with_auth(test_client):
    """Test AI assistant chat with authentication"""
    # First login
    login_data = {"email": "test@example.com"}
    login_response = test_client.post("/api/auth/login", json=login_data)
    cookies = login_response.cookies
    
    chat_data = {
        "message": "Show me SUVs with electric engines"
    }
    
    response = test_client.post("/api/ai", json=chat_data, cookies=cookies)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    assert "text" in data["data"]
    
    # If recommendations are provided, check their type
    if "recommendations" in data["data"]:
        assert isinstance(data["data"]["recommendations"], list)

def test_ai_specific_queries(test_client):
    """Test AI assistant responses to specific queries"""
    # Test for test drive information
    test_drive_query = {
        "message": "I want to schedule a test drive"
    }
    response = test_client.post("/api/ai", json=test_drive_query)
    assert response.status_code == 200
    data = response.json()
    assert "test drive" in data["data"]["text"].lower()
    assert data["data"].get("action") == "SCHEDULE_TEST_DRIVE"
    
    # Test for dealership hours
    hours_query = {
        "message": "What are your opening hours?"
    }
    response = test_client.post("/api/ai", json=hours_query)
    assert response.status_code == 200
    data = response.json()
    assert any(keyword in data["data"]["text"].lower() for keyword in ["open", "hour", "monday", "friday"])
    assert data["data"].get("action") == "SHOW_CONTACT_INFO"
    
    # Test for pricing information
    price_query = {
        "message": "Tell me about your financing options"
    }
    response = test_client.post("/api/ai", json=price_query)
    assert response.status_code == 200
    data = response.json()
    assert any(keyword in data["data"]["text"].lower() for keyword in ["price", "cost", "financ"])
    assert data["data"].get("action") == "SHOW_FINANCING_OPTIONS"

def test_ai_invalid_request(test_client):
    """Test AI assistant with invalid request (missing message)"""
    chat_data = {
        "userId": "someUserId"  # Missing message field
    }
    
    response = test_client.post("/api/ai", json=chat_data)
    assert response.status_code == 200  # Still returns 200 but with error flag
    data = response.json()
    assert data["success"] is False
    assert "message" in data
    assert "required" in data["message"].lower()