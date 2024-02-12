CREATE TABLE data(
    datum varchar(50),
    SN varchar (10),
    Type1 varchar (10),
    kwh varchar(25)
);


/*Query 1 - Grabs all data points with type 21*/
SELECT * FROM data WHERE type1 = '21';

/*#Query 2: Grabs all data points from a specific date*/ 
SELECT * 
FROM data 
WHERE datum LIKE '10/10/2022%';

/*Query 3: Grabs all data points for a certain Serial number*/
Select * 
FROM data
WHERE SN = '009963'

/*Query 4: Grabs all data points for a certain serial number for a given time*/
SELECT * 
FROM data
WHERE SN = '000156' AND datum LIKE '10/10/2022%';

/*Query 5: Grabs all data points for certain serial number, type and time*/
SELECT * 
FROM data 
WHERE SN = '000156' AND datum LIKE '10/10/2022%' AND type1 = '21';
