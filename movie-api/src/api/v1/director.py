from fastapi import APIRouter, HTTPException
from dataclasses import field
from pydantic.dataclasses import dataclass

router = APIRouter(
    prefix="/directors",
    tags=["directors"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)
