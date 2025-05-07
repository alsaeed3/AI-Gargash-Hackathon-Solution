from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import cars, appointments, auth, ai, health
from app.db.mongodb import connect_to_mongo, close_mongo_connection

app = FastAPI(
    title="Gargash Motors API",
    description="API for the Gargash Motors car dealership",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(cars.router, prefix="/api")
app.include_router(appointments.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(ai.router, prefix="/api")
app.include_router(health.router, prefix="/api")

@app.on_event("startup")
async def startup_db_client():
    """Connect to MongoDB when application starts"""
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection when application shuts down"""
    await close_mongo_connection()

@app.get("/")
async def root():
    return {"message": "Welcome to the Gargash Motors API"}