from fastapi import APIRouter, HTTPException
from dataclasses import field
from pydantic.dataclasses import dataclass

router = APIRouter(
    prefix="/actors",
    tags=["actors"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)
