from fastapi import APIRouter, HTTPException, status, Response, Depends
from bson import ObjectId
from datetime import datetime

from app.db.mongodb import db
from app.schemas.user import User, UserCreate, Token
from app.auth.jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["authentication"],
    responses={404: {"description": "Not found"}},
)

# Helper function to convert MongoDB document to User schema
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user.get("phone"),
        "preferences": user.get("preferences", {
            "brands": [],
            "bodyTypes": [],
            "priceRange": {},
            "fuelTypes": [],
            "features": []
        }),
        "interactionHistory": user.get("interactionHistory", []),
        "createdAt": user.get("createdAt", datetime.now()),
        "updatedAt": user.get("updatedAt", datetime.now())
    }

@router.post("/register", response_model=dict)
async def register(user: UserCreate, response: Response):
    """
    Register a new user and return JWT token
    """
    users_collection = db.users
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create new user
    user_dict = user.dict()
    user_dict["preferences"] = {
        "brands": [],
        "bodyTypes": [],
        "priceRange": {},
        "fuelTypes": [],
        "features": []
    }
    user_dict["interactionHistory"] = []
    user_dict["createdAt"] = datetime.now()
    user_dict["updatedAt"] = user_dict["createdAt"]
    
    result = await users_collection.insert_one(user_dict)
    
    if result.inserted_id:
        # Get the inserted user
        new_user = await users_collection.find_one({"_id": result.inserted_id})
        
        # Generate JWT token
        token = create_access_token({
            "userId": str(new_user["_id"]),
            "email": new_user["email"],
            "name": new_user["name"]
        })
        
        # Set cookie for next.js frontend compatibility
        response.set_cookie(
            key="authToken",
            value=token,
            httponly=True,
            max_age=60*60*24*7,  # 7 days
            samesite="lax",
            secure=False  # Set to True in production with HTTPS
        )
        
        return {
            "success": True,
            "data": {
                "user": {
                    "id": str(new_user["_id"]),
                    "name": new_user["name"],
                    "email": new_user["email"]
                }
            }
        }
    
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Failed to create user"
    )

@router.post("/login", response_model=dict)
async def login(user_data: dict, response: Response):
    """
    Login user and return JWT token
    """
    email = user_data.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is required"
        )
    
    users_collection = db.users
    user = await users_collection.find_one({"email": email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found with this email"
        )
    
    # Generate JWT token
    token = create_access_token({
        "userId": str(user["_id"]),
        "email": user["email"],
        "name": user["name"]
    })
    
    # Set cookie for next.js frontend compatibility
    response.set_cookie(
        key="authToken",
        value=token,
        httponly=True,
        max_age=60*60*24*7,  # 7 days
        samesite="lax",
        secure=False  # Set to True in production with HTTPS
    )
    
    return {
        "success": True,
        "data": {
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"]
            }
        }
    }

@router.post("/logout")
async def logout(response: Response):
    """
    Logout user by removing the JWT token cookie
    """
    response.delete_cookie(key="authToken")
    
    return {
        "success": True,
        "message": "Logged out successfully"
    }