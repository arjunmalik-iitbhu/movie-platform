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
