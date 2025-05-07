from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from typing import Optional
from datetime import datetime

from app.db.mongodb import db
from app.schemas.ai import AiRequest, AiResponse, AiRecommendation
from app.auth.jwt import get_current_user, TokenData

router = APIRouter(
    prefix="/ai",
    tags=["ai"],
    responses={404: {"description": "Not found"}},
)

async def process_ai_message(message: str, user_preferences: Optional[dict] = None):
    """
    Process the user message and generate a response
    This is a simple placeholder implementation
    In a real application, you would integrate with an AI service like OpenAI
    """
    # Basic keyword matching for demo purposes
    lowercaseMsg = message.lower()
    
    # Handle car recommendation requests
    if (lowercaseMsg.find('recommend') != -1 or 
        lowercaseMsg.find('suggest') != -1 or 
        lowercaseMsg.find('looking for') != -1):
        
        # Extract potential car preferences from the message
        query = {}
        
        if lowercaseMsg.find('suv') != -1:
            query["bodyType"] = "suv"
        elif lowercaseMsg.find('sedan') != -1:
            query["bodyType"] = "sedan"
        elif lowercaseMsg.find('coupe') != -1:
            query["bodyType"] = "coupe"
        
        if lowercaseMsg.find('luxury') != -1:
            query["bodyType"] = "luxury"
        
        if lowercaseMsg.find('electric') != -1:
            query["fuelType"] = "electric"
        elif lowercaseMsg.find('hybrid') != -1:
            query["fuelType"] = "hybrid"
        
        # Use user preferences if available
        if user_preferences:
            if user_preferences.get("bodyTypes") and len(user_preferences["bodyTypes"]) > 0 and "bodyType" not in query:
                query["bodyType"] = {"$in": user_preferences["bodyTypes"]}
            
            if user_preferences.get("brands") and len(user_preferences["brands"]) > 0:
                query["brand"] = {"$in": user_preferences["brands"]}
            
            if user_preferences.get("fuelTypes") and len(user_preferences["fuelTypes"]) > 0 and "fuelType" not in query:
                query["fuelType"] = {"$in": user_preferences["fuelTypes"]}
        
        # Get car recommendations
        cars_collection = db.cars
        if query:
            cars_cursor = cars_collection.find(query).limit(3)
            cars = await cars_cursor.to_list(None)
        else:
            cars = []
        
        if len(cars) > 0:
            # Convert ObjectId to string for JSON serialization
            for car in cars:
                car["_id"] = str(car["_id"])
                
            return AiRecommendation(
                text="Based on your preferences, here are some cars I'd recommend:",
                recommendations=cars
            )
        else:
            # Get popular cars if no match
            cars_cursor = cars_collection.find().sort("popularityScore", -1).limit(3)
            cars = await cars_cursor.to_list(None)
            
            # Convert ObjectId to string for JSON serialization
            for car in cars:
                car["_id"] = str(car["_id"])
                
            return AiRecommendation(
                text="I couldn't find cars matching your exact criteria. Here are some popular options:",
                recommendations=cars
            )
    
    # Handle test drive scheduling queries
    elif lowercaseMsg.find('test drive') != -1 or lowercaseMsg.find('appointment') != -1:
        return AiRecommendation(
            text="I'd be happy to help you schedule a test drive. Please fill out the appointment form with your preferred date and time, and we'll confirm your appointment shortly.",
            action="SCHEDULE_TEST_DRIVE"
        )
    
    # Handle general information queries
    elif lowercaseMsg.find('hours') != -1 or lowercaseMsg.find('location') != -1 or lowercaseMsg.find('address') != -1:
        return AiRecommendation(
            text="Gargash Motors is open Monday through Friday from 9am to 7pm, and Saturday from 10am to 5pm. We're located at Sheikh Zayed Road, Dubai, UAE. Would you like me to provide directions?",
            action="SHOW_CONTACT_INFO"
        )
    
    # Handle price queries
    elif lowercaseMsg.find('price') != -1 or lowercaseMsg.find('cost') != -1 or lowercaseMsg.find('financing') != -1:
        return AiRecommendation(
            text="Our vehicles range in price depending on the model, features, and whether they're new or pre-owned. We offer competitive financing options tailored to your needs. Would you like to speak with one of our financial advisors?",
            action="SHOW_FINANCING_OPTIONS"
        )
    
    # Default response
    else:
        return AiRecommendation(
            text="I'm here to help you find the perfect car, schedule a test drive, or answer any questions about our services. How can I assist you today?"
        )

@router.post("/", response_model=AiResponse)
async def ai_chat(request: AiRequest, current_user: Optional[TokenData] = None):
    """
    Process AI assistant chat messages
    """
    try:
        # Validate message
        if not request.message:
            return AiResponse(
                success=False,
                message="Message is required"
            )
        
        # Get user preferences if user is authenticated or ID provided
        user_preferences = None
        if current_user or request.userId:
            # Fetch user preferences to personalize responses
            users_collection = db.users
            user_id = current_user.userId if current_user else request.userId
            
            if user_id:
                user = await users_collection.find_one({"_id": ObjectId(user_id)})
                if user:
                    user_preferences = user.get("preferences")
        
        # Process the message
        response = await process_ai_message(request.message, user_preferences)
        
        return AiResponse(
            success=True,
            data=response
        )
    except Exception as e:
        return AiResponse(
            success=False,
            message=str(e)
        )