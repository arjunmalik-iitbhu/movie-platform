FROM --platform=linus/amd64 postgres:18.1

RUN localedef -i de_DE -c -f UTF-8 -A /usr/share/locale/locale.alias de_DE.UTF-8
ENV LANG de_DE.utf8

ARG MOVIE_POSTGRES_PASSWORD
ENV POSTGRES_DB movie
ENV POSTGRES_USER movie
ENV POSTGRES_PASSWORD=$MOVIE_POSTGRES_PASSWORD
