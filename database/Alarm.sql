CREATE TABLE Alarm(
	ID INT PRIMARY KEY AUTO_INCREMENT,
	Email VARCHAR(50),
	AlarmTitle TEXT,
    AssigneeID VARCHAR(50),
    AlarmDetails TEXT,
	AlarmDateTime DATETIME,
    SendEmail BOOLEAN,
    FOREIGN KEY (AssigneeID) REFERENCES Assignee(AssigneeID),
	FOREIGN KEY (Email) REFERENCES Account(Email) ON DELETE CASCADE
);
