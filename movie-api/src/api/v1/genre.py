from fastapi import APIRouter, HTTPException
from dataclasses import field
from pydantic.dataclasses import dataclass

router = APIRouter(
    prefix="/genres",
    tags=["genres"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)
