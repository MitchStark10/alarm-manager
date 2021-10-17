CREATE TABLE Assignee (
    AssigneeID VARCHAR(50),
    AccountEmail VARCHAR(50),
    FOREIGN KEY (AccountEmail) REFERENCES Account(Email),
    PRIMARY KEY (AssigneeID, AccountEmail)
);
