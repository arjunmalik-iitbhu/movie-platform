from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from deps import get_session
from dto import MovieCreate
from model.entity import Movie

router = APIRouter(
    tags=["movies"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.get("/movies", response_model=list[Movie])
async def read_movies(
    offset: int = 0,
    limit: int = 10,
    movie: Optional[str] = None,
    genre: Optional[str] = None,
    actor: Optional[str] = None,
    director: Optional[str] = None,
    session: AsyncSession = Depends(get_session)
):
    result = await session.exec(select(Movie).offset(offset).limit(limit))
    movies = result.all()
    return movies

@router.get("/movie/{movie_id}", response_model=list[Movie])
async def read_movie(
    movie_id: str,
    session: AsyncSession = Depends(get_session)
):
    result = await session.exec(select(Movie).where(Movie.id == int(movie_id)))
    movie = result.first()
    if not movie or not movie.id:
        raise HTTPException(status_code=404, detail=f"Movie {movie_id} not found")
    return movie

@router.put(
    "/movie/{movie_id}",
    responses={403: {"description": "Operation forbidden"}},
)
async def update_movie(movie_id: str, session: AsyncSession = Depends(get_session)):
    return HTTPException(status_code=403, detail=f"Operation forbidden")

@router.post("/movie", response_model=Movie, status_code=status.HTTP_201_CREATED)
async def create_movie(movie: MovieCreate, session: AsyncSession = Depends(get_session)):
    db_movie = Movie.model_validate(movie)
    await session.add(db_movie)
    await session.commit()
    await session.refresh(db_movie)
    return db_movie
