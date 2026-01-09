from pydantic import BaseModel, ConfigDict
from typing import Optional
from pydantic.alias_generators import to_camel

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class MovieCreateReq(BaseSchema):
    """
    Data Transfer Object for creating a new movie.
    """

    title: str
    release_year: int
    director_id: Optional[int] = None
    actor_ids: Optional[list[int]] = None
    genre_ids: Optional[list[int]] = None
