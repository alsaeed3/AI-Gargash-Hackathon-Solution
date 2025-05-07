from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class AiRequest(BaseModel):
    message: str
    userId: Optional[str] = None

class AiRecommendation(BaseModel):
    text: str
    recommendations: Optional[List[Dict[str, Any]]] = None
    action: Optional[str] = None

class AiResponse(BaseModel):
    success: bool
    data: Optional[AiRecommendation] = None
    message: Optional[str] = None