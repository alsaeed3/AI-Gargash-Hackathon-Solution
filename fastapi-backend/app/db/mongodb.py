import motor.motor_asyncio
from pymongo import MongoClient
from pymongo.database import Database
import logging
import os

# MongoDB connection details - get from environment variables with fallbacks
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://mongodb:27017")
DATABASE_NAME = os.environ.get("DATABASE_NAME", "gargash_motors")

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create async MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

# Create sync MongoDB client (for compatibility with some operations)
sync_client = MongoClient(MONGO_URI)
sync_db = sync_client[DATABASE_NAME]

async def connect_to_mongo():
    """Connect to MongoDB and log the connection status."""
    try:
        # Verify connection by getting server info
        await client.server_info()
        logger.info(f"Connected to MongoDB at {MONGO_URI}")
        return True
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        return False

async def close_mongo_connection():
    """Close MongoDB connection."""
    client.close()
    sync_client.close()
    logger.info("Closed MongoDB connection")

def get_database() -> Database:
    """Get synchronous MongoDB database instance."""
    return sync_db