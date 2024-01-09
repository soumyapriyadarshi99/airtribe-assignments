use movie_theatre;

CREATE TABLE Theatres(
thetreId INT PRIMARY KEY,
theatreName VARCHAR(255),
location VARCHAR(255)
);
CREATE TABLE Movies(
movieId INT PRIMARY KEY,
moviewName VARCHAR(255),
language VARCHAR(255)
);
CREATE TABLE Shows(
showID INT PRIMARY KEY,
movieId INT,
theatreId INT,
date DATE,
showTime TIME,
FOREIGN KEY (movieID) REFERENCES Movies(movieId),
FOREIGN KEY (theatreId) REFERENCES Theatres(thetreId)
);

SELECT * FROM Theatres;
INSERT INTO Theatres VALUES
(1,'AMB Cinemas','Hyderabad'),
(2,'Forum Cinemas','Bhubaneswar'),
(3,' SLN Cinemas','Bengaluru');

SELECT * FROM Movies;
INSERT INTO Movies VALUES
(101,'Animal','Telugu'),
(102,'Godzilla','English'),
(103,'Aquaman','Hindi');

SELECT * FROM Shows;
INSERT INTO Shows VALUES
(1001,101,1,'2024-01-10', '18:00:00'),
(1002,102,2,'2024-01-10', '21:00:00'),
(1003,103,3,'2024-01-10', '21:00:00');

SELECT Movies.moviewName,Shows.showTime FROM
Shows INNER JOIN Movies
WHERE Shows.TheatreId=1 AND Shows.date= '2024-01-10'; 

















