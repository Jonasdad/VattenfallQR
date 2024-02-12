CREATE TABLE data(
    datum varchar(50),
    SN varchar (10),
    Type1 varchar (10),
    kwh float[]
);


#Query 1:
SELECT * FROM data WHERE type1 = '21';

#Query 2:
SELECT * 
FROM data 
WHERE datum LIKE '10/10/2022%';