from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from enum import Enum

class AppointmentType(str, Enum):
    test_drive = "test-drive"
    service = "service"
    consultation = "consultation"

class AppointmentStatus(str, Enum):
    scheduled = "scheduled"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class ContactDetails(BaseModel):
    name: str
    email: EmailStr
    phone: str

class AppointmentBase(BaseModel):
    userId: Optional[str] = None
    carId: Optional[str] = None
    appointmentType: AppointmentType
    appointmentDate: datetime
    status: AppointmentStatus = AppointmentStatus.scheduled
    notes: Optional[str] = None
    contactDetails: ContactDetails

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    appointmentType: Optional[AppointmentType] = None
    appointmentDate: Optional[datetime] = None
    status: Optional[AppointmentStatus] = None
    notes: Optional[str] = None
    contactDetails: Optional[ContactDetails] = None

class AppointmentInDB(AppointmentBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True

class Appointment(AppointmentInDB):
    pass