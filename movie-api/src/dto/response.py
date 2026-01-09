from pydantic import BaseModel, ConfigDict
from typing import Optional
from pydantic.alias_generators import to_camel


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True
    )

class MovieRes(BaseSchema):
    """
    Data Transfer Object for returning a movie.
    """

    id: int
    title: str
    release_year: int
    director_id: Optional[int] = None

class ActorRes(BaseSchema):
    """
    Data Transfer Object for returning a actor.
    """

    id: int
    name: str

class DirectorRes(BaseSchema):
    """
    Data Transfer Object for returning a director.
    """

    id: int
    name: str

class GenreRes(BaseSchema):
    """
    Data Transfer Object for returning a genre.
    """

    id: int
    name: str

