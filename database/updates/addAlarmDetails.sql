ALTER TABLE Alarm
CHANGE AlarmText AlarmTitle TEXT,
ADD AlarmDetails TEXT AFTER `AlarmTitle`;
