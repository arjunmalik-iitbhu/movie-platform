from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from deps import get_session
from dto import MovieCreate

router = APIRouter(
    tags=["movies"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.get("/movies")
async def read_movies(session: Session = Depends(get_session)):
    return "movies_db"

@router.get("/movie/{movie_id}")
async def read_movie(movie_id: str, session: Session = Depends(get_session)):
    # if movie_id not in _movies_db:
    #     raise HTTPException(status_code=404, detail="Movie not found")
    # return {"name": _movies_db[movie_id]["name"], "movie_id": movie_id}
    return {"status": 200}

@router.put(
    "/movie/{movie_id}",
    responses={403: {"description": "Operation forbidden"}},
)
async def update_movie(movie_id: str, session: Session = Depends(get_session)):
    return {"movie_id": movie_id}

@app.post("/movie")
async def create_movie(movie: MovieCreate, session: Session = Depends(get_session)):
    return {"status": 200}
