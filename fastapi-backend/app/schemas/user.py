from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from enum import Enum

class InteractionType(str, Enum):
    car_view = "car-view"
    test_drive = "test-drive"
    query = "query"
    purchase = "purchase"

class PriceRange(BaseModel):
    min: Optional[float] = None
    max: Optional[float] = None

class InteractionHistory(BaseModel):
    type: InteractionType
    itemId: str
    timestamp: datetime = Field(default_factory=datetime.now)

class UserPreferences(BaseModel):
    brands: List[str] = []
    bodyTypes: List[str] = []
    priceRange: PriceRange = Field(default_factory=PriceRange)
    fuelTypes: List[str] = []
    features: List[str] = []

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    preferences: UserPreferences = Field(default_factory=UserPreferences)

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    preferences: Optional[UserPreferences] = None

class UserInDB(UserBase):
    id: str
    interactionHistory: List[InteractionHistory] = []
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        orm_mode = True

class User(UserInDB):
    pass

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    userId: str
    email: str
    name: str