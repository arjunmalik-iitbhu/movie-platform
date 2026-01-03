from service.movie import MovieService

class MovieController:
    def __init__(self, service):
        self.service = service

    async def create_movie(self, movie_data:MovieBaseModel):
        return await self.service.create_movie(movie_data)

    async def read_movies(self):
        return await self.service.get_all_movies()

    async def read_movie_by_email(self, movie_email: str):
        return await self.service.get_movie_by_email(movie_email)

    async def update_movie(self, movie_id, movie_data: MovieBaseModel):
        return await self.service.update_movie(movie_id, movie_data)

    async def delete_movie(self, movie_id: int):
        return await self.service.delete_movie(movie_id)