export const permitType= `
select * from permitType;
`;

export const driverPermit= `
SELECT 
  driverPermit.data->>'issue_date' AS issue_date,
  driverPermit.data->>'exp_date' AS exp_date,
  permitType.data->>'type' AS type
from driverPermit
join permitType ON driverPermit.permitType = permitType.id
where driverPermit.driverID::text = $1::text;
`;
