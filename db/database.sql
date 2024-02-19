/*Usage:
    1. Install Postgresql
    2. Create a database called 'vattenfall'
    3. Create a user called 'vattenfall' with password '6321'
    4. Create a table with 5 headers (datum, tid, SN, Type1, kwh)
    5. Run data.js through "node data.js" in terminal
    6. Finished
*/

CREATE TABLE data(
    datum varchar(50),
    tid varchar(100),
    SN varchar (10),
    Type1 varchar (10),
    wh float,
    volt float,
    ampere float
);



/* Query 1: Returns all data points for a certain serial number for a given time */
SELECT * 
FROM data
WHERE SN = '<SN>' AND datum = '<Datum>';


/* Query 2: Returns the 5 most frequent occuring serial numbers i.e. most measured appliance */
SELECT sn, COUNT(*) 
FROM data 
GROUP BY sn 
ORDER BY COUNT(*) DESC 
LIMIT 5;