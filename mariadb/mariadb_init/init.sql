-- Questo script viene eseguito la prima volta che il container del database viene creato.

-- Crea la tabella 'directors' per memorizzare le informazioni sui registi.
CREATE TABLE directors
(
  id INT
  AUTO_INCREMENT PRIMARY KEY, -- Chiave primaria con auto-incremento
    name VARCHAR
  (255) NOT NULL,        -- Nome del regista, non può essere nullo
    birth_year INT                      -- Anno di nascita (opzionale)
);

  -- Crea la tabella 'movies' per i film.
  CREATE TABLE movies
  (
    id INT
    AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR
    (255) NOT NULL,
    anno INT,
    genere VARCHAR
    (100),
    director_id INT, -- Chiave esterna che si collega alla tabella 'directors'
    FOREIGN KEY
    (director_id) REFERENCES directors
    (id) -- Vincolo di integrità referenziale
);

    -- Crea la tabella 'platforms' per le piattaforme di streaming.
    CREATE TABLE platforms
    (
      id INT
      AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
      (255) NOT NULL UNIQUE -- Il nome della piattaforma deve essere unico
);

      -- Crea una tabella 'ponte' (o 'di giunzione') per gestire la relazione molti-a-molti
      -- tra film e piattaforme (un film può essere su più piattaforme, e una piattaforma ha più film).
      CREATE TABLE movie_platforms
      (
        movie_id INT,
        platform_id INT,
        PRIMARY KEY (movie_id, platform_id),
        -- La chiave primaria è la coppia (film, piattaforma)
        FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
        -- Se un film viene cancellato, anche le sue associazioni vengono cancellate
        FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
      );

      -- INSERIMENTO DATI DI ESEMPIO --

      -- Inserisce alcuni registi
      INSERT INTO directors (name, birth_year) VALUES
      ('Christopher Nolan', 1970),
      ('Quentin Tarantino', 1963),
      ('Martin Scorsese', 1942),
      ('Steven Spielberg', 1946),
      ('Denis Villeneuve', 1967),
      ('Ridley Scott', 1937),
      ('Peter Jackson', 1961),
      ('Stanley Kubrick', 1928),
      ('Francis Ford Coppola', 1939),
      ('David Fincher', 1962),
      ('James Cameron', 1954),
      ('George Lucas', 1944);

      -- Inserisce alcuni film
      INSERT INTO movies (titolo, anno, genere, director_id) VALUES
      ('Inception', 2010, 'Sci-Fi', 1),
      ('The Dark Knight', 2008, 'Action', 1),
      ('Interstellar', 2014, 'Sci-Fi', 1),
      ('Memento', 2000, 'Thriller', 1),
      ('Pulp Fiction', 1994, 'Crime', 2),
      ('Kill Bill: Vol. 1', 2003, 'Action', 2),
      ('Django Unchained', 2012, 'Western', 2),
      ('The Irishman', 2019, 'Crime', 3),
      ('Goodfellas', 1990, 'Crime', 3),
      ('The Wolf of Wall Street', 2013, 'Biography', 3),
      ('Jurassic Park', 1993, 'Adventure', 4),
      ('Schindler''s List', 1993, 'Biography', 4),
      ('Saving Private Ryan', 1998, 'Drama', 4),
      ('Dune', 2021, 'Sci-Fi', 5),
      ('Blade Runner 2049', 2017, 'Sci-Fi', 5),
      ('Arrival', 2016, 'Sci-Fi', 5),
      ('Gladiator', 2000, 'Action', 6),
      ('Alien', 1979, 'Sci-Fi', 6),
      ('The Lord of the Rings: The Fellowship of the Ring', 2001, 'Fantasy', 7),
      ('The Lord of the Rings: The Return of the King', 2003, 'Fantasy', 7),
      ('2001: A Space Odyssey', 1968, 'Sci-Fi', 8),
      ('The Shining', 1980, 'Horror', 8),
      ('The Godfather', 1972, 'Crime', 9),
      ('The Godfather: Part II', 1974, 'Crime', 9),
      ('Apocalypse Now', 1979, 'Drama', 9),
      ('Fight Club', 1999, 'Drama', 10),
      ('Se7en', 1995, 'Crime', 10),
      ('The Social Network', 2010, 'Biography', 10),
      ('Titanic', 1997, 'Romance', 11),
      ('Avatar', 2009, 'Sci-Fi', 11),
      ('Terminator 2: Judgment Day', 1991, 'Action', 11),
      ('Star Wars: Episode IV - A New Hope', 1977, 'Sci-Fi', 12);

      -- Inserisce alcune piattaforme
      INSERT INTO platforms (name) VALUES
      ('Netflix'),
      ('Amazon Prime Video'),
      ('Disney+'),
      ('HBO Max'),
      ('Hulu'),
      ('Apple TV+');

      -- Associa i film alle piattaforme
      INSERT INTO movie_platforms (movie_id, platform_id) VALUES
      (1, 1), (1, 2),
      (2, 4),
      (3, 2), (3, 4),
      (4, 2),
      (5, 1), (5, 4),
      (6, 5),
      (7, 1),
      (8, 1),
      (9, 4),
      (10, 2),
      (11, 2), (11, 3),
      (12, 1),
      (13, 2),
      (14, 4),
      (15, 2),
      (16, 1),
      (17, 2),
      (18, 3),
      (19, 4), (20, 4),
      (21, 4),
      (22, 4),
      (23, 4), (24, 4),
      (25, 2),
      (26, 1),
      (27, 4),
      (28, 1),
      (29, 3), (29, 4),
      (30, 3),
      (31, 2),
      (32, 3);