from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import api
from config import get_settings

app = FastAPI()

app.include_router(api.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=(",".split(get_settings().cors_origins)),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"message": "Service is running"}
