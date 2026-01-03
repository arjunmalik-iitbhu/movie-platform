from fastapi import APIRouter, HTTPException
from dataclasses import field
from pydantic.dataclasses import dataclass

router = APIRouter(
    prefix="/movies",
    tags=["movies"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@dataclass
class Movie:
    movie_id: str
    name: str

_movies_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}

@router.get("/")
async def read_movies():
    return _movies_db

@router.get("/{movie_id}")
async def read_movie(movie_id: str):
    if movie_id not in _movies_db:
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"name": _movies_db[movie_id]["name"], "movie_id": movie_id}

@router.put(
    "/{movie_id}",
    responses={403: {"description": "Operation forbidden"}},
)
async def update_movie(movie_id: str):
    if movie_id != "plumbus":
        raise HTTPException(
            status_code=403, detail="You can only update the movie: plumbus"
        )
    return {"movie_id": movie_id, "name": "The great Plumbus"}

@app.post("/movies/")
async def create_movies(author_id: str, movies: list[Movie]):
    return {"status": 200}
