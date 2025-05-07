from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class BodyType(str, Enum):
    sedan = "sedan"
    suv = "suv"
    hatchback = "hatchback"
    coupe = "coupe"
    convertible = "convertible"
    wagon = "wagon"
    van = "van"
    truck = "truck"
    luxury = "luxury"

class FuelType(str, Enum):
    gasoline = "gasoline"
    diesel = "diesel"
    hybrid = "hybrid"
    electric = "electric"
    plug_in_hybrid = "plug-in hybrid"

class Transmission(str, Enum):
    automatic = "automatic"
    manual = "manual"
    semi_automatic = "semi-automatic"
    cvt = "cvt"

class CarBase(BaseModel):
    brand: str
    model: str
    year: int = Field(..., ge=1900, le=datetime.now().year + 1)
    price: float = Field(..., ge=0)
    bodyType: BodyType
    fuelType: FuelType
    transmission: Transmission
    color: str
    mileage: int = Field(default=0, ge=0)
    engineCapacity: float
    horsepower: Optional[int] = None
    features: List[str] = []
    description: str
    imageUrl: str
    additionalImages: List[str] = []
    availability: bool = True
    popularityScore: int = 0

class CarCreate(CarBase):
    pass

class CarUpdate(BaseModel):
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = Field(None, ge=1900, le=datetime.now().year + 1)
    price: Optional[float] = Field(None, ge=0)
    bodyType: Optional[BodyType] = None
    fuelType: Optional[FuelType] = None
    transmission: Optional[Transmission] = None
    color: Optional[str] = None
    mileage: Optional[int] = Field(None, ge=0)
    engineCapacity: Optional[float] = None
    horsepower: Optional[int] = None
    features: Optional[List[str]] = None
    description: Optional[str] = None
    imageUrl: Optional[str] = None
    additionalImages: Optional[List[str]] = None
    availability: Optional[bool] = None
    popularityScore: Optional[int] = None

class CarInDB(CarBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True

class Car(CarInDB):
    pass

class CarFilter(BaseModel):
    brand: Optional[str] = None
    bodyType: Optional[BodyType] = None
    minPrice: Optional[float] = Field(None, ge=0)
    maxPrice: Optional[float] = Field(None, ge=0)
    fuelType: Optional[FuelType] = None