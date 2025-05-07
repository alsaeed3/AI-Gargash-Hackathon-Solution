#!/bin/bash

# Run FastAPI server with reload for development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000