class MovieRepository:
    def __init__(self, db):
        self.db = db

    async def get_all_movies(self):
        pass

    async def delete_movie(self, movie_id):
        pass

    async def create_movie(self, movie_data):
        pass

    async def update_movie(self, movie_id, movie_data):
        pass
