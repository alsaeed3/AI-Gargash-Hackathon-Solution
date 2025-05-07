from fastapi import APIRouter
from app.db.mongodb import connect_to_mongo

router = APIRouter(
    prefix="/health",
    tags=["health"],
)

@router.get("/")
async def check_health():
    """
    Health check endpoint to verify API and database are working
    """
    # Check if we can connect to the database
    db_connected = await connect_to_mongo()
    
    return {
        "status": "healthy" if db_connected else "unhealthy",
        "services": {
            "api": "up",
            "database": "up" if db_connected else "down"
        }
    }