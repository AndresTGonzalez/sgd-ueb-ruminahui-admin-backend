SELECT
  ROW_NUMBER() OVER (
    ORDER BY
      (
        SELECT
          NULL
      )
  ) AS UniqueID,
  ID,
  AuthDateTime,
  AuthDate,
  AuthTime,
  Direction,
  DeviceName,
  DeviceSerial,
  PersonName,
  CardNo,
  SyncStatus
FROM
  LOGS;