from fastapi import Depends, FastAPI
from .internal import admin
from . import api

app = FastAPI()

app.include_router(api.router)

@app.get("/health")
async def health():
    return {"message": "Service is running"}
