from pydantic import BaseModel
from typing import Optional


class MovieCreateReq(BaseModel):
    """
    Data Transfer Object for creating a new movie.
    """

    title: str
    release_year: int
    director_id: Optional[int] = None
    actor_ids: Optional[list[int]] = None
    genre_ids: Optional[list[int]] = None
