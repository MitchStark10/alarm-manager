CREATE TABLE Account(
	Email VARCHAR(50) PRIMARY KEY,
	PassHash TEXT,
	ApiKey VARCHAR(50),
	SessionCookie VARCHAR(50)
);