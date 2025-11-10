-- PostgreSQL Setup
CREATE DATABASE ORG;
-- \c ORG (connect to database in psql)

CREATE TABLE Worker (
    WORKER_ID SERIAL PRIMARY KEY,
    FIRST_NAME VARCHAR(25),
    LAST_NAME VARCHAR(25),
    SALARY INTEGER,
    JOINING_DATE TIMESTAMP,
    DEPARTMENT VARCHAR(25)
);

-- Insert data (PostgreSQL uses standard date format)
INSERT INTO Worker 
    (FIRST_NAME, LAST_NAME, SALARY, JOINING_DATE, DEPARTMENT) VALUES
        ('Monika', 'Arora', 100000, '2014-02-20 09:00:00', 'HR'),
        ('Niharika', 'Verma', 80000, '2014-06-11 09:00:00', 'Admin'),
        ('Vishal', 'Singhal', 300000, '2014-02-20 09:00:00', 'HR'),
        ('Amitabh', 'Singh', 500000, '2014-02-20 09:00:00', 'Admin'),
        ('Vivek', 'Bhati', 500000, '2014-06-11 09:00:00', 'Admin'),
        ('Vipul', 'Diwan', 200000, '2014-06-11 09:00:00', 'Account'),
        ('Satish', 'Kumar', 75000, '2014-01-20 09:00:00', 'Account'),
        ('Geetika', 'Chauhan', 90000, '2014-04-11 09:00:00', 'Admin');

-- Create Title and Bonus tables (referenced in some queries)
CREATE TABLE Title (
    WORKER_REF_ID INTEGER,
    WORKER_TITLE VARCHAR(25),
    AFFECTED_FROM TIMESTAMP,
    FOREIGN KEY (WORKER_REF_ID) REFERENCES Worker(WORKER_ID)
);

CREATE TABLE Bonus (
    WORKER_REF_ID INTEGER,
    BONUS_AMOUNT INTEGER,
    BONUS_DATE TIMESTAMP,
    FOREIGN KEY (WORKER_REF_ID) REFERENCES Worker(WORKER_ID)
);

-- Sample data for Title table
INSERT INTO Title VALUES
    (1, 'Manager', '2016-02-20 00:00:00'),
    (2, 'Executive', '2016-06-11 00:00:00'),
    (8, 'Manager', '2016-06-11 00:00:00'),
    (5, 'Manager', '2016-06-11 00:00:00'),
    (4, 'Asst. Manager', '2016-06-11 00:00:00'),
    (7, 'Executive', '2016-06-11 00:00:00'),
    (6, 'Lead', '2016-06-11 00:00:00'),
    (3, 'Lead', '2016-06-11 00:00:00');
--Sample data for Bonus

    INSERT INTO Bonus (WORKER_REF_ID, BONUS_AMOUNT, BONUS_DATE) VALUES
    (1, 5000, '2016-02-20 00:00:00'),
    (2, 3000, '2016-06-11 00:00:00'),
    (3, 4000, '2017-02-20 00:00:00'),
    (1, 4500, '2018-02-20 00:00:00'),
    (4, 6500, '2018-06-11 00:00:00'),
    (5, 8000, '2019-02-20 00:00:00'),
    (6, 3000, '2020-02-20 00:00:00'),
    (8, 5000, '2020-06-11 00:00:00'),
    (3, 7000, '2021-02-20 00:00:00');


-- ===========================================
-- POSTGRESQL QUERIES (50 Questions)
-- ===========================================

-- 1. Fetch FIRST_NAME with alias WORKER_NAME
SELECT first_name AS WORKER_NAME FROM worker;

-- 2. Fetch FIRST_NAME in upper case
SELECT UPPER(first_name) FROM worker;

-- 3. Fetch unique DEPARTMENT values
SELECT DISTINCT department FROM worker;

-- 4. First three characters of FIRST_NAME
SELECT SUBSTRING(first_name, 1, 3) FROM worker;
-- OR: SELECT LEFT(first_name, 3) FROM worker;

-- 5. Position of 'b' in 'Amitabh'
SELECT POSITION('b' IN first_name) FROM worker WHERE first_name = 'Amitabh';
-- OR: SELECT STRPOS(first_name, 'b') FROM worker WHERE first_name = 'Amitabh';

-- 6. Remove white spaces from right side
SELECT RTRIM(first_name) FROM worker;

-- 7. Remove white spaces from left side
SELECT LTRIM(department) FROM worker;

-- 8. Unique DEPARTMENT values with length
SELECT DISTINCT department, LENGTH(department) FROM worker;

-- 9. Replace 'a' with 'A' in FIRST_NAME
SELECT REPLACE(first_name, 'a', 'A') FROM worker;

-- 10. Concatenate FIRST_NAME and LAST_NAME
SELECT CONCAT(first_name, ' ', last_name) AS COMPLETE_NAME FROM worker;
-- OR: SELECT first_name || ' ' || last_name AS COMPLETE_NAME FROM worker;

-- 11. Order by FIRST_NAME ascending
SELECT * FROM worker ORDER BY first_name;

-- 12. Order by FIRST_NAME asc, DEPARTMENT desc
SELECT * FROM worker ORDER BY first_name, department DESC;

-- 13. Workers named Vipul or Satish
SELECT * FROM worker WHERE first_name IN ('Vipul', 'Satish');

-- 14. Workers NOT named Vipul or Satish
SELECT * FROM worker WHERE first_name NOT IN ('Vipul', 'Satish');

-- 15. Department starting with 'Admin'
SELECT * FROM worker WHERE department LIKE 'Admin%';

-- 16. FIRST_NAME contains 'a'
SELECT * FROM worker WHERE first_name LIKE '%a%';

-- 17. FIRST_NAME ends with 'a'
SELECT * FROM worker WHERE first_name LIKE '%a';

-- 18. FIRST_NAME ends with 'h' and has 6 characters
SELECT * FROM worker WHERE first_name LIKE '_____h';

-- 19. Salary between 100000 and 500000
SELECT * FROM worker WHERE salary BETWEEN 100000 AND 500000;

-- 20. Workers who joined in Feb 2014
SELECT * FROM worker 
WHERE EXTRACT(YEAR FROM joining_date) = 2014 
AND EXTRACT(MONTH FROM joining_date) = 2;

-- 21. Count of employees in Admin department
SELECT COUNT(*) FROM worker WHERE department = 'Admin';

-- 22. Full names with salary between 50000 and 100000
SELECT CONCAT(first_name, ' ', last_name) AS full_name 
FROM worker 
WHERE salary BETWEEN 50000 AND 100000;

-- 23. Number of workers per department (descending)
SELECT department, COUNT(worker_id) AS no_of_worker 
FROM worker 
GROUP BY department 
ORDER BY no_of_worker DESC;

-- 24. Workers who are Managers
SELECT w.* 
FROM worker AS w 
INNER JOIN title AS t ON w.worker_id = t.worker_ref_id 
WHERE t.worker_title = 'Manager';

-- 25. Titles appearing more than once
SELECT worker_title, COUNT(*) AS count 
FROM title 
GROUP BY worker_title 
HAVING COUNT(*) > 1;

-- 26. Show only odd rows
SELECT * FROM worker WHERE MOD(worker_id, 2) <> 0;
-- OR: SELECT * FROM worker WHERE worker_id % 2 <> 0;

-- 27. Show only even rows
SELECT * FROM worker WHERE MOD(worker_id, 2) = 0;
-- OR: SELECT * FROM worker WHERE worker_id % 2 = 0;

-- 28. Clone a table
CREATE TABLE worker_clone AS TABLE worker;
-- OR: CREATE TABLE worker_clone AS SELECT * FROM worker;

-- 29. Fetch intersecting records
SELECT worker.* FROM worker 
INNER JOIN worker_clone USING(worker_id);

-- 30. Records in worker but not in worker_clone
SELECT worker.* FROM worker 
LEFT JOIN worker_clone USING(worker_id) 
WHERE worker_clone.worker_id IS NULL;

-- 31. Show current date and time
SELECT CURRENT_DATE;
SELECT CURRENT_TIMESTAMP;
-- OR: SELECT NOW();

-- 32. Top 5 records by salary
SELECT * FROM worker ORDER BY salary DESC LIMIT 5;

-- 33. 5th highest salary
SELECT * FROM worker ORDER BY salary DESC LIMIT 1 OFFSET 4;

-- 34. 5th highest salary without LIMIT
SELECT salary FROM worker w1 
WHERE 4 = (
    SELECT COUNT(DISTINCT w2.salary) 
    FROM worker w2 
    WHERE w2.salary >= w1.salary
);

-- 35. Employees with same salary
SELECT w1.* FROM worker w1, worker w2 
WHERE w1.salary = w2.salary AND w1.worker_id != w2.worker_id;

-- 36. Second highest salary using subquery
SELECT MAX(salary) FROM worker 
WHERE salary < (SELECT MAX(salary) FROM worker);
-- OR: SELECT MAX(salary) FROM worker WHERE salary NOT IN (SELECT MAX(salary) FROM worker);

-- 37. Show one row twice
SELECT * FROM worker 
UNION ALL 
SELECT * FROM worker 
ORDER BY worker_id;

-- 38. Workers who don't get bonus
SELECT worker_id FROM worker 
WHERE worker_id NOT IN (SELECT worker_ref_id FROM bonus);

-- 39. First 50% of records
SELECT * FROM worker 
WHERE worker_id <= (SELECT COUNT(worker_id)/2 FROM worker);

-- 40. Departments with less than 4 people
SELECT department, COUNT(department) AS depCount 
FROM worker 
GROUP BY department 
HAVING COUNT(department) < 4;

-- 41. All departments with people count
SELECT department, COUNT(department) AS depCount 
FROM worker 
GROUP BY department;

-- 42. Last record from table
SELECT * FROM worker 
WHERE worker_id = (SELECT MAX(worker_id) FROM worker);
-- OR: SELECT * FROM worker ORDER BY worker_id DESC LIMIT 1;

-- 43. First row from table
SELECT * FROM worker 
WHERE worker_id = (SELECT MIN(worker_id) FROM worker);
-- OR: SELECT * FROM worker ORDER BY worker_id LIMIT 1;

-- 44. Last 5 records from table
SELECT * FROM (
    SELECT * FROM worker ORDER BY worker_id DESC LIMIT 5
) sub ORDER BY worker_id;

-- 45. Highest salary in each department
SELECT w.department, w.first_name, w.salary 
FROM (
    SELECT MAX(salary) AS maxsal, department 
    FROM worker 
    GROUP BY department
) temp 
INNER JOIN worker w ON temp.department = w.department 
AND temp.maxsal = w.salary;

-- 46. Three highest salaries
SELECT DISTINCT salary FROM worker w1 
WHERE 3 >= (
    SELECT COUNT(DISTINCT salary) 
    FROM worker w2 
    WHERE w1.salary <= w2.salary
) 
ORDER BY w1.salary DESC;

-- 47. Three lowest salaries
SELECT DISTINCT salary FROM worker w1 
WHERE 3 >= (
    SELECT COUNT(DISTINCT salary) 
    FROM worker w2 
    WHERE w1.salary >= w2.salary
) 
ORDER BY w1.salary DESC;

-- 48. nth highest salary (replace n with number)
SELECT DISTINCT salary FROM worker w1 
WHERE n >= (
    SELECT COUNT(DISTINCT salary) 
    FROM worker w2 
    WHERE w1.salary <= w2.salary
) 
ORDER BY w1.salary DESC;

-- 49. Department-wise total salary (descending)
SELECT department, SUM(salary) AS depSal 
FROM worker 
GROUP BY department 
ORDER BY depSal DESC;

-- 50. Workers with maximum salary
SELECT first_name, salary FROM worker 
WHERE salary = (SELECT MAX(salary) FROM worker);
