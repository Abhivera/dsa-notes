# PostgreSQL Crash Course - Complete Revision Guide

## 0. Setup: Database, Tables & Dummy Data

### Create Database
```sql
-- Connect to PostgreSQL (default postgres database)
-- Then create a new database
CREATE DATABASE company_db;

-- Connect to the new database
\c company_db;

-- Or from command line:
-- psql -U postgres
-- CREATE DATABASE company_db;
-- \c company_db
```

### Create Tables
```sql
-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    location VARCHAR(100),
    budget NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE DEFAULT CURRENT_DATE,
    salary NUMERIC(10,2) CHECK (salary > 0),
    department_id INTEGER,
    manager_id INTEGER,
    active BOOLEAN DEFAULT true,
    skills TEXT[],
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_department FOREIGN KEY (department_id) 
        REFERENCES departments(id) ON DELETE SET NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) 
        REFERENCES employees(id) ON DELETE SET NULL
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    department_id INTEGER,
    start_date DATE,
    end_date DATE,
    budget NUMERIC(12,2),
    status VARCHAR(20) DEFAULT 'planning',
    CONSTRAINT fk_project_dept FOREIGN KEY (department_id) 
        REFERENCES departments(id) ON DELETE CASCADE,
    CONSTRAINT check_dates CHECK (end_date >= start_date)
);

-- Employee_Projects junction table (many-to-many)
CREATE TABLE employee_projects (
    employee_id INTEGER,
    project_id INTEGER,
    role VARCHAR(50),
    hours_allocated INTEGER,
    PRIMARY KEY (employee_id, project_id),
    CONSTRAINT fk_emp FOREIGN KEY (employee_id) 
        REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_proj FOREIGN KEY (project_id) 
        REFERENCES projects(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_attendance_emp FOREIGN KEY (employee_id) 
        REFERENCES employees(id) ON DELETE CASCADE
);

-- Salaries history table
CREATE TABLE salary_history (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    old_salary NUMERIC(10,2),
    new_salary NUMERIC(10,2),
    change_date DATE DEFAULT CURRENT_DATE,
    reason VARCHAR(200),
    CONSTRAINT fk_salary_emp FOREIGN KEY (employee_id) 
        REFERENCES employees(id) ON DELETE CASCADE
);
```

### Insert Dummy Data

```sql
-- Insert Departments
INSERT INTO departments (name, location, budget) VALUES
('Engineering', 'New York', 2000000.00),
('Human Resources', 'New York', 500000.00),
('Sales', 'San Francisco', 1500000.00),
('Marketing', 'Los Angeles', 800000.00),
('Finance', 'Chicago', 1000000.00),
('Operations', 'Boston', 750000.00),
('Customer Support', 'Austin', 600000.00),
('Research & Development', 'Seattle', 1800000.00);

-- Insert Employees (with some managers first, then their reports)
INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, department_id, manager_id, skills, metadata) VALUES
-- Top Management (no managers)
('Sarah', 'Johnson', 'sarah.johnson@company.com', '555-0101', '2018-01-15', 150000, 1, NULL, ARRAY['Leadership', 'Strategy', 'Java'], '{"level": "senior", "clearance": "high"}'),
('Michael', 'Chen', 'michael.chen@company.com', '555-0102', '2018-03-20', 145000, 3, NULL, ARRAY['Sales', 'Negotiation', 'CRM'], '{"level": "senior", "clearance": "high"}'),
('Emily', 'Rodriguez', 'emily.rodriguez@company.com', '555-0103', '2019-02-10', 135000, 5, NULL, ARRAY['Finance', 'Analysis', 'Excel'], '{"level": "senior", "clearance": "high"}'),

-- Engineering Department
('David', 'Kim', 'david.kim@company.com', '555-0104', '2019-06-15', 95000, 1, 1, ARRAY['Python', 'SQL', 'AWS'], '{"level": "mid", "clearance": "medium"}'),
('Jennifer', 'Martinez', 'jennifer.martinez@company.com', '555-0105', '2020-01-20', 88000, 1, 1, ARRAY['JavaScript', 'React', 'Node.js'], '{"level": "mid", "clearance": "medium"}'),
('James', 'Taylor', 'james.taylor@company.com', '555-0106', '2020-08-10', 92000, 1, 1, ARRAY['Java', 'Spring', 'Docker'], '{"level": "mid", "clearance": "medium"}'),
('Lisa', 'Anderson', 'lisa.anderson@company.com', '555-0107', '2021-03-15', 78000, 1, 4, ARRAY['Python', 'Django', 'PostgreSQL'], '{"level": "junior", "clearance": "low"}'),
('Robert', 'Thomas', 'robert.thomas@company.com', '555-0108', '2021-09-01', 75000, 1, 4, ARRAY['Go', 'Kubernetes', 'CI/CD'], '{"level": "junior", "clearance": "low"}'),

-- Human Resources
('Maria', 'Garcia', 'maria.garcia@company.com', '555-0109', '2019-04-12', 72000, 2, NULL, ARRAY['Recruitment', 'Communication', 'HRIS'], '{"level": "mid", "clearance": "high"}'),
('Daniel', 'Wilson', 'daniel.wilson@company.com', '555-0110', '2020-11-08', 65000, 2, 9, ARRAY['Training', 'Development', 'MS Office'], '{"level": "junior", "clearance": "medium"}'),

-- Sales Department
('Jessica', 'Moore', 'jessica.moore@company.com', '555-0111', '2019-07-22', 85000, 3, 2, ARRAY['B2B Sales', 'Presentations', 'Salesforce'], '{"level": "mid", "clearance": "medium"}'),
('Christopher', 'Jackson', 'christopher.jackson@company.com', '555-0112', '2020-02-14', 80000, 3, 2, ARRAY['Cold Calling', 'Lead Generation', 'CRM'], '{"level": "mid", "clearance": "medium"}'),
('Amanda', 'White', 'amanda.white@company.com', '555-0113', '2021-05-19', 68000, 3, 11, ARRAY['Sales', 'Customer Relations', 'Negotiation'], '{"level": "junior", "clearance": "low"}'),

-- Marketing
('Matthew', 'Harris', 'matthew.harris@company.com', '555-0114', '2019-09-30', 77000, 4, NULL, ARRAY['Digital Marketing', 'SEO', 'Content Strategy'], '{"level": "mid", "clearance": "medium"}'),
('Ashley', 'Clark', 'ashley.clark@company.com', '555-0115', '2020-12-05', 70000, 4, 14, ARRAY['Social Media', 'Analytics', 'Copywriting'], '{"level": "junior", "clearance": "low"}'),

-- Finance
('Ryan', 'Lewis', 'ryan.lewis@company.com', '555-0116', '2019-11-18', 82000, 5, 3, ARRAY['Accounting', 'Financial Analysis', 'SAP'], '{"level": "mid", "clearance": "high"}'),
('Nicole', 'Walker', 'nicole.walker@company.com', '555-0117', '2020-06-25', 76000, 5, 3, ARRAY['Budgeting', 'Forecasting', 'Excel'], '{"level": "mid", "clearance": "medium"}'),

-- Operations
('Brandon', 'Hall', 'brandon.hall@company.com', '555-0118', '2020-03-08', 73000, 6, NULL, ARRAY['Process Optimization', 'Logistics', 'ERP'], '{"level": "mid", "clearance": "medium"}'),
('Stephanie', 'Allen', 'stephanie.allen@company.com', '555-0119', '2021-01-14', 67000, 6, 18, ARRAY['Supply Chain', 'Inventory', 'Data Analysis'], '{"level": "junior", "clearance": "low"}'),

-- Customer Support
('Kevin', 'Young', 'kevin.young@company.com', '555-0120', '2020-07-29', 58000, 7, NULL, ARRAY['Customer Service', 'Problem Solving', 'Zendesk'], '{"level": "mid", "clearance": "low"}'),
('Rachel', 'King', 'rachel.king@company.com', '555-0121', '2021-04-03', 52000, 7, 20, ARRAY['Support', 'Communication', 'Technical Knowledge'], '{"level": "junior", "clearance": "low"}'),

-- R&D
('Justin', 'Wright', 'justin.wright@company.com', '555-0122', '2019-05-17', 98000, 8, NULL, ARRAY['Research', 'Machine Learning', 'Python'], '{"level": "senior", "clearance": "high"}'),
('Megan', 'Lopez', 'megan.lopez@company.com', '555-0123', '2020-10-22', 87000, 8, 22, ARRAY['Data Science', 'Statistics', 'R'], '{"level": "mid", "clearance": "medium"}'),
('Tyler', 'Hill', 'tyler.hill@company.com', '555-0124', '2021-08-11', 79000, 8, 22, ARRAY['AI', 'TensorFlow', 'Python'], '{"level": "junior", "clearance": "medium"}'),

-- Some inactive employees
('Laura', 'Scott', 'laura.scott@company.com', '555-0125', '2019-12-01', 71000, 4, 14, ARRAY['Marketing', 'Email Campaigns'], '{"level": "mid", "clearance": "low"}'),
('Patrick', 'Green', 'patrick.green@company.com', NULL, '2020-05-15', 64000, 7, 20, ARRAY['Support', 'Troubleshooting'], '{"level": "junior", "clearance": "low"}');

-- Update some employees as inactive
UPDATE employees SET active = false WHERE id IN (25, 26);

-- Insert Projects
INSERT INTO projects (name, description, department_id, start_date, end_date, budget, status) VALUES
('Cloud Migration', 'Migrate all services to AWS cloud infrastructure', 1, '2024-01-15', '2024-12-31', 500000, 'active'),
('Mobile App Development', 'Build iOS and Android mobile applications', 1, '2024-03-01', '2024-11-30', 400000, 'active'),
('ERP System Upgrade', 'Upgrade to latest ERP system version', 6, '2024-02-01', '2024-08-31', 250000, 'active'),
('Employee Wellness Program', 'Launch comprehensive wellness initiative', 2, '2024-01-01', '2024-12-31', 100000, 'active'),
('Q4 Sales Campaign', 'Major sales push for holiday season', 3, '2024-10-01', '2024-12-31', 300000, 'planning'),
('Brand Refresh', 'Update company branding and marketing materials', 4, '2024-04-01', '2024-09-30', 200000, 'active'),
('AI Research Initiative', 'Explore AI applications for products', 8, '2024-01-01', '2025-06-30', 800000, 'active'),
('Customer Portal', 'Build self-service customer portal', 1, '2023-06-01', '2024-03-31', 350000, 'completed'),
('Financial Audit 2024', 'Annual financial audit and compliance', 5, '2024-01-15', '2024-04-15', 150000, 'completed'),
('Support System Upgrade', 'Implement new ticketing system', 7, '2024-05-01', '2024-08-31', 120000, 'active');

-- Assign employees to projects
INSERT INTO employee_projects (employee_id, project_id, role, hours_allocated) VALUES
-- Cloud Migration
(1, 1, 'Project Lead', 500),
(4, 1, 'Senior Developer', 800),
(5, 1, 'Developer', 800),
(6, 1, 'DevOps Engineer', 700),

-- Mobile App Development
(1, 2, 'Technical Advisor', 200),
(5, 2, 'Lead Developer', 900),
(7, 2, 'Backend Developer', 850),
(8, 2, 'Junior Developer', 850),

-- ERP System Upgrade
(18, 3, 'Project Lead', 600),
(19, 3, 'Analyst', 700),

-- Employee Wellness Program
(9, 4, 'Program Manager', 500),
(10, 4, 'Coordinator', 600),

-- Q4 Sales Campaign
(2, 5, 'Campaign Director', 400),
(11, 5, 'Sales Lead', 500),
(12, 5, 'Sales Representative', 500),
(13, 5, 'Sales Representative', 500),

-- Brand Refresh
(14, 6, 'Creative Director', 600),
(15, 6, 'Marketing Specialist', 700),

-- AI Research Initiative
(22, 7, 'Research Lead', 1000),
(23, 7, 'Data Scientist', 1000),
(24, 7, 'ML Engineer', 1000),

-- Customer Portal
(4, 8, 'Backend Lead', 800),
(5, 8, 'Frontend Developer', 800),

-- Financial Audit
(3, 9, 'Audit Lead', 400),
(16, 9, 'Financial Analyst', 500),
(17, 9, 'Financial Analyst', 500),

-- Support System Upgrade
(20, 10, 'Project Manager', 400),
(21, 10, 'Support Specialist', 500);

-- Insert Attendance records (last 30 days for some employees)
INSERT INTO attendance (employee_id, check_in, check_out, date)
SELECT 
    e.id,
    (d::date + TIME '09:00:00' + (RANDOM() * INTERVAL '60 minutes'))::timestamp,
    (d::date + TIME '17:30:00' + (RANDOM() * INTERVAL '90 minutes'))::timestamp,
    d::date
FROM employees e
CROSS JOIN generate_series(
    CURRENT_DATE - INTERVAL '29 days',
    CURRENT_DATE,
    INTERVAL '1 day'
) AS d
WHERE e.active = true
    AND EXTRACT(DOW FROM d) NOT IN (0, 6)  -- Exclude weekends
    AND e.id <= 15  -- Only for first 15 employees to keep data manageable
    AND RANDOM() > 0.1;  -- 90% attendance rate

-- Insert Salary History
INSERT INTO salary_history (employee_id, old_salary, new_salary, change_date, reason) VALUES
(4, 85000, 90000, '2023-01-15', 'Annual raise'),
(4, 90000, 95000, '2024-01-15', 'Performance bonus'),
(5, 80000, 85000, '2023-01-20', 'Annual raise'),
(5, 85000, 88000, '2024-01-20', 'Annual raise'),
(11, 78000, 82000, '2023-07-22', 'Promotion'),
(11, 82000, 85000, '2024-07-22', 'Annual raise'),
(14, 72000, 75000, '2023-09-30', 'Annual raise'),
(14, 75000, 77000, '2024-09-30', 'Annual raise'),
(16, 76000, 80000, '2023-11-18', 'Promotion'),
(16, 80000, 82000, '2024-11-18', 'Annual raise');
```

### Create Indexes for Performance
```sql
-- Indexes on foreign keys
CREATE INDEX idx_emp_department ON employees(department_id);
CREATE INDEX idx_emp_manager ON employees(manager_id);
CREATE INDEX idx_proj_department ON projects(department_id);
CREATE INDEX idx_attendance_emp ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_salary_hist_emp ON salary_history(employee_id);

-- Indexes for common queries
CREATE INDEX idx_emp_email ON employees(email);
CREATE INDEX idx_emp_salary ON employees(salary);
CREATE INDEX idx_emp_hire_date ON employees(hire_date);
CREATE INDEX idx_emp_active ON employees(active) WHERE active = true;

-- GIN indexes for array and JSONB
CREATE INDEX idx_emp_skills ON employees USING GIN(skills);
CREATE INDEX idx_emp_metadata ON employees USING GIN(metadata);

-- Full-text search index
CREATE INDEX idx_emp_name_fts ON employees 
USING GIN(to_tsvector('english', first_name || ' ' || last_name));
```

### Verify Data
```sql
-- Check row counts
SELECT 'departments' as table_name, COUNT(*) as row_count FROM departments
UNION ALL
SELECT 'employees', COUNT(*) FROM employees
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'employee_projects', COUNT(*) FROM employee_projects
UNION ALL
SELECT 'attendance', COUNT(*) FROM attendance
UNION ALL
SELECT 'salary_history', COUNT(*) FROM salary_history;

-- Quick data preview
SELECT 
    e.first_name, 
    e.last_name, 
    d.name as department,
    e.salary,
    m.first_name || ' ' || m.last_name as manager
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.active = true
LIMIT 10;
```

---

## 1. Basic SQL Structure

```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1;
```

## 2. Data Retrieval (SELECT)

### Basic SELECT
```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with aliases (PostgreSQL supports both formats)
SELECT first_name AS "First Name", salary AS annual_salary FROM employees;
```

### DISTINCT
```sql
-- Remove duplicates
SELECT DISTINCT department FROM employees;

-- DISTINCT ON (PostgreSQL-specific)
SELECT DISTINCT ON (department) department, first_name, salary
FROM employees
ORDER BY department, salary DESC;
```

## 3. Filtering Data (WHERE)

### Basic Conditions
```sql
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'IT';
SELECT * FROM employees WHERE hire_date >= '2020-01-01';
```

### Logical Operators
```sql
-- AND, OR, NOT
SELECT * FROM employees WHERE salary > 50000 AND department = 'IT';
SELECT * FROM employees WHERE department = 'IT' OR department = 'HR';
SELECT * FROM employees WHERE NOT department = 'Finance';
```

### Comparison Operators
```sql
-- BETWEEN
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;

-- IN
SELECT * FROM employees WHERE department IN ('IT', 'HR', 'Finance');

-- LIKE (Pattern Matching)
SELECT * FROM employees WHERE first_name LIKE 'J%';     -- Starts with J
SELECT * FROM employees WHERE first_name LIKE '%son';   -- Ends with son
SELECT * FROM employees WHERE first_name LIKE '_ohn';   -- Second letter is o

-- ILIKE (Case-insensitive, PostgreSQL-specific)
SELECT * FROM employees WHERE first_name ILIKE 'john%';

-- Regular Expressions (PostgreSQL-specific)
SELECT * FROM employees WHERE first_name ~ '^J.*n$';    -- Starts with J, ends with n
SELECT * FROM employees WHERE first_name ~* '^john';    -- Case-insensitive regex

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE phone IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;
```

## 4. Sorting Data (ORDER BY)

```sql
-- Ascending (default)
SELECT * FROM employees ORDER BY salary;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees ORDER BY department, salary DESC;

-- NULLS FIRST/LAST (PostgreSQL-specific)
SELECT * FROM employees ORDER BY phone NULLS LAST;
SELECT * FROM employees ORDER BY phone DESC NULLS FIRST;
```

## 5. Limiting Results

```sql
-- LIMIT and OFFSET
SELECT * FROM employees LIMIT 10;
SELECT * FROM employees LIMIT 10 OFFSET 20;

-- Alternative syntax
SELECT * FROM employees OFFSET 20 ROWS FETCH FIRST 10 ROWS ONLY;
```

## 6. Aggregate Functions

```sql
SELECT COUNT(*) FROM employees;                    -- Count rows
SELECT COUNT(DISTINCT department) FROM employees;  -- Count unique values
SELECT AVG(salary) FROM employees;                 -- Average
SELECT SUM(salary) FROM employees;                 -- Sum
SELECT MIN(salary), MAX(salary) FROM employees;    -- Min and Max

-- String aggregation (PostgreSQL-specific)
SELECT STRING_AGG(first_name, ', ') FROM employees;
SELECT STRING_AGG(first_name, ', ' ORDER BY first_name) FROM employees;

-- Array aggregation (PostgreSQL-specific)
SELECT ARRAY_AGG(first_name ORDER BY salary DESC) FROM employees;
```

## 7. Grouping Data (GROUP BY)

```sql
-- Basic grouping
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department;

-- Multiple columns
SELECT department, job_title, AVG(salary)
FROM employees
GROUP BY department, job_title;

-- HAVING (filter groups)
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;

-- FILTER clause (PostgreSQL 9.4+)
SELECT 
    department,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE salary > 60000) AS high_earners
FROM employees
GROUP BY department;
```

## 8. Joins

### Sample Tables
```sql
-- employees table: id, first_name, last_name, department_id, salary
-- departments table: id, name, location
```

### INNER JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

### LEFT JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### RIGHT JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

### FULL OUTER JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

### CROSS JOIN
```sql
SELECT e.first_name, d.name
FROM employees e
CROSS JOIN departments d;
```

### Self Join
```sql
SELECT e1.first_name AS employee, e2.first_name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

### LATERAL JOIN (PostgreSQL-specific)
```sql
SELECT d.name, top_earners.*
FROM departments d
LEFT JOIN LATERAL (
    SELECT first_name, salary
    FROM employees e
    WHERE e.department_id = d.id
    ORDER BY salary DESC
    LIMIT 3
) top_earners ON true;
```

## 9. Subqueries

### Single Value Subquery
```sql
SELECT * FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### Multiple Value Subquery
```sql
SELECT * FROM employees 
WHERE department_id IN (SELECT id FROM departments WHERE location = 'New York');
```

### Correlated Subquery
```sql
SELECT e1.* FROM employees e1
WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);
```

### EXISTS
```sql
SELECT * FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);
```

### ANY/ALL (PostgreSQL-specific operators)
```sql
-- ANY
SELECT * FROM employees WHERE salary > ANY(SELECT salary FROM employees WHERE department_id = 1);

-- ALL
SELECT * FROM employees WHERE salary > ALL(SELECT salary FROM employees WHERE department_id = 1);
```

## 10. Common Table Expressions (CTEs)

### Basic CTE
```sql
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 70000
)
SELECT department_id, COUNT(*) 
FROM high_earners
GROUP BY department_id;
```

### Multiple CTEs
```sql
WITH 
dept_avg AS (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
),
dept_info AS (
    SELECT d.id, d.name, da.avg_salary
    FROM departments d
    JOIN dept_avg da ON d.id = da.department_id
)
SELECT * FROM dept_info WHERE avg_salary > 60000;
```

### Recursive CTE
```sql
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers
    SELECT id, first_name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees reporting to previous level
    SELECT e.id, e.first_name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, first_name;
```

## 11. Data Manipulation

### INSERT
```sql
-- Single row
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES ('John', 'Doe', 55000, 1);

-- Multiple rows
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES 
    ('Jane', 'Smith', 60000, 2),
    ('Bob', 'Johnson', 52000, 1);

-- RETURNING clause (PostgreSQL-specific)
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES ('Alice', 'Williams', 58000, 1)
RETURNING id, first_name, last_name;

-- From another table
INSERT INTO employees_backup 
SELECT * FROM employees WHERE hire_date < '2020-01-01';

-- ON CONFLICT (UPSERT - PostgreSQL 9.5+)
INSERT INTO employees (id, first_name, last_name, salary)
VALUES (1, 'John', 'Doe', 55000)
ON CONFLICT (id) DO UPDATE 
SET salary = EXCLUDED.salary;

-- ON CONFLICT DO NOTHING
INSERT INTO employees (id, first_name, last_name, salary)
VALUES (1, 'John', 'Doe', 55000)
ON CONFLICT (id) DO NOTHING;
```

### UPDATE
```sql
-- Single column
UPDATE employees SET salary = 65000 WHERE id = 1;

-- Multiple columns
UPDATE employees 
SET salary = salary * 1.1, last_updated = CURRENT_DATE
WHERE department_id = 1;

-- With FROM clause
UPDATE employees e
SET salary = salary * 1.05
FROM departments d
WHERE e.department_id = d.id AND d.name = 'IT';

-- RETURNING clause
UPDATE employees 
SET salary = salary * 1.1 
WHERE department_id = 1
RETURNING id, first_name, salary;
```

### DELETE
```sql
-- With condition
DELETE FROM employees WHERE id = 1;

-- Multiple conditions
DELETE FROM employees WHERE salary < 30000 AND hire_date < '2019-01-01';

-- With USING clause
DELETE FROM employees e
USING departments d
WHERE e.department_id = d.id AND d.name = 'Obsolete';

-- RETURNING clause
DELETE FROM employees WHERE salary < 30000
RETURNING id, first_name, last_name;

-- All rows (be careful!)
DELETE FROM employees;
```

## 12. Table Operations (DDL)

### CREATE TABLE
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary NUMERIC(10,2),
    hire_date DATE DEFAULT CURRENT_DATE,
    department_id INTEGER,
    metadata JSONB,  -- PostgreSQL-specific
    skills TEXT[],   -- Array type
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- With table options
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    salary NUMERIC(10,2) CHECK (salary > 0),
    created_at TIMESTAMP DEFAULT NOW()
) WITH (fillfactor = 70);
```

### ALTER TABLE
```sql
-- Add column
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);

-- Modify column type
ALTER TABLE employees ALTER COLUMN salary TYPE NUMERIC(12,2);

-- Set default
ALTER TABLE employees ALTER COLUMN hire_date SET DEFAULT CURRENT_DATE;

-- Drop default
ALTER TABLE employees ALTER COLUMN hire_date DROP DEFAULT;

-- Set NOT NULL
ALTER TABLE employees ALTER COLUMN email SET NOT NULL;

-- Drop NOT NULL
ALTER TABLE employees ALTER COLUMN phone DROP NOT NULL;

-- Drop column
ALTER TABLE employees DROP COLUMN phone;

-- Add constraint
ALTER TABLE employees ADD CONSTRAINT fk_dept 
FOREIGN KEY (department_id) REFERENCES departments(id);

-- Rename column
ALTER TABLE employees RENAME COLUMN first_name TO given_name;

-- Rename table
ALTER TABLE employees RENAME TO staff;
```

### DROP TABLE
```sql
DROP TABLE employees;
DROP TABLE IF EXISTS employees;
DROP TABLE employees CASCADE;  -- Drop with dependent objects
```

## 13. PostgreSQL Data Types

### Common Types
```sql
-- Numeric
INTEGER, BIGINT, SMALLINT
NUMERIC(precision, scale), DECIMAL
REAL, DOUBLE PRECISION
SERIAL, BIGSERIAL  -- Auto-incrementing

-- Character
CHAR(n), VARCHAR(n), TEXT

-- Date/Time
DATE, TIME, TIMESTAMP, TIMESTAMPTZ, INTERVAL

-- Boolean
BOOLEAN  -- TRUE, FALSE, NULL

-- JSON
JSON, JSONB  -- JSONB is binary, more efficient

-- Arrays
INTEGER[], TEXT[], VARCHAR(50)[]

-- UUID
UUID

-- Network
INET, CIDR, MACADDR

-- Geometric
POINT, LINE, CIRCLE, POLYGON
```

### Working with Arrays
```sql
-- Create array
SELECT ARRAY[1,2,3,4,5];
SELECT '{1,2,3,4,5}'::INTEGER[];

-- Array operations
SELECT first_name FROM employees WHERE 'SQL' = ANY(skills);
SELECT first_name FROM employees WHERE skills @> ARRAY['SQL', 'Python'];
SELECT first_name FROM employees WHERE skills && ARRAY['SQL', 'Java'];

-- Array functions
SELECT array_length(skills, 1) FROM employees;
SELECT unnest(skills) FROM employees;
```

### Working with JSON/JSONB
```sql
-- Create JSONB
INSERT INTO employees (first_name, metadata)
VALUES ('John', '{"age": 30, "city": "NYC"}'::JSONB);

-- Query JSONB
SELECT metadata->>'age' FROM employees;  -- Returns text
SELECT metadata->'age' FROM employees;   -- Returns JSONB
SELECT * FROM employees WHERE metadata->>'city' = 'NYC';
SELECT * FROM employees WHERE metadata @> '{"city": "NYC"}';

-- JSONB functions
SELECT jsonb_each(metadata) FROM employees;
SELECT jsonb_object_keys(metadata) FROM employees;
```

## 14. String Functions

```sql
SELECT 
    UPPER(first_name) AS upper_name,
    LOWER(last_name) AS lower_name,
    CONCAT(first_name, ' ', last_name) AS full_name,
    first_name || ' ' || last_name AS full_name_alt,  -- Concatenation operator
    LENGTH(first_name) AS name_length,
    SUBSTRING(first_name, 1, 3) AS first_three_chars,
    POSITION('oh' IN first_name) AS position,
    TRIM(first_name) AS trimmed,
    REPLACE(first_name, 'a', 'A') AS replaced,
    SPLIT_PART(email, '@', 1) AS username,  -- PostgreSQL-specific
    REGEXP_REPLACE(phone, '[^0-9]', '', 'g') AS digits_only
FROM employees;
```

## 15. Date/Time Functions

```sql
SELECT 
    CURRENT_DATE,
    CURRENT_TIME,
    CURRENT_TIMESTAMP,
    NOW(),
    EXTRACT(YEAR FROM hire_date) AS hire_year,
    EXTRACT(MONTH FROM hire_date) AS hire_month,
    DATE_PART('year', hire_date) AS hire_year_alt,
    AGE(CURRENT_DATE, hire_date) AS employment_duration,
    hire_date + INTERVAL '1 year' AS anniversary,
    hire_date + INTERVAL '3 months 2 days' AS future_date,
    DATE_TRUNC('month', hire_date) AS month_start,
    TO_CHAR(hire_date, 'YYYY-MM-DD') AS formatted_date,
    TO_CHAR(hire_date, 'Day, Month DD, YYYY') AS long_format
FROM employees;
```

## 16. Numeric Functions

```sql
SELECT 
    ROUND(salary/12, 2) AS monthly_salary,
    CEIL(salary/1000.0) AS salary_thousands_rounded_up,
    FLOOR(salary/1000.0) AS salary_thousands_rounded_down,
    ABS(-1000) AS absolute_value,
    MOD(salary, 1000) AS remainder,
    POWER(2, 3) AS power_result,
    SQRT(salary) AS square_root,
    RANDOM() AS random_value,
    TRUNC(salary/12, 2) AS truncated
FROM employees;
```

## 17. Conditional Logic

### CASE Statement
```sql
SELECT 
    first_name,
    last_name,
    salary,
    CASE 
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;
```

### COALESCE and NULLIF
```sql
-- COALESCE: Return first non-null value
SELECT COALESCE(phone, email, 'No contact') AS contact FROM employees;

-- NULLIF: Return NULL if values are equal
SELECT NULLIF(salary, 0) FROM employees;  -- Returns NULL if salary is 0
```

## 18. Window Functions

```sql
-- ROW_NUMBER
SELECT 
    first_name, 
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;

-- RANK and DENSE_RANK
SELECT 
    first_name, 
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- NTILE (divide into N groups)
SELECT 
    first_name,
    salary,
    NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;

-- Partition by department
SELECT 
    first_name, 
    department_id,
    salary,
    AVG(salary) OVER (PARTITION BY department_id) AS dept_avg_salary,
    salary - AVG(salary) OVER (PARTITION BY department_id) AS diff_from_avg
FROM employees;

-- Running totals
SELECT 
    first_name, 
    salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total,
    SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_explicit
FROM employees;

-- LAG and LEAD
SELECT 
    first_name,
    salary,
    LAG(salary) OVER (ORDER BY hire_date) AS previous_hire_salary,
    LEAD(salary) OVER (ORDER BY hire_date) AS next_hire_salary,
    salary - LAG(salary) OVER (ORDER BY hire_date) AS salary_diff
FROM employees;

-- FIRST_VALUE and LAST_VALUE
SELECT 
    first_name,
    salary,
    FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS highest_in_dept,
    LAST_VALUE(salary) OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_in_dept
FROM employees;
```

## 19. Indexes and Performance

### Create Index
```sql
-- Basic index
CREATE INDEX idx_employee_salary ON employees(salary);

-- Composite index
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Partial index (PostgreSQL-specific)
CREATE INDEX idx_active_employees ON employees(department_id) WHERE active = true;

-- Expression index (PostgreSQL-specific)
CREATE INDEX idx_lower_email ON employees(LOWER(email));

-- GIN index for JSONB, arrays, full-text search
CREATE INDEX idx_employee_skills ON employees USING GIN(skills);
CREATE INDEX idx_employee_metadata ON employees USING GIN(metadata);

-- GiST index for geometric types, full-text search
CREATE INDEX idx_employee_location ON employees USING GIST(location);

-- Drop index
DROP INDEX idx_employee_salary;
```

### Query Analysis
```sql
-- Explain query execution plan
EXPLAIN SELECT * FROM employees WHERE salary > 60000;

-- Explain with actual execution
EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 60000;

-- More detailed explain
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) SELECT * FROM employees WHERE salary > 60000;
```

### Vacuum and Analyze
```sql
-- Update statistics
ANALYZE employees;

-- Reclaim storage and update statistics
VACUUM ANALYZE employees;

-- Full vacuum (locks table)
VACUUM FULL employees;
```

## 20. Constraints

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary NUMERIC(10,2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) 
        REFERENCES departments(id) ON DELETE CASCADE,
    CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Deferrable constraints (PostgreSQL-specific)
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) 
        REFERENCES employees(id) DEFERRABLE INITIALLY DEFERRED
);
```

## 21. Transactions

```sql
-- Basic transaction
BEGIN;
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 1;
UPDATE departments SET budget = budget * 1.1 WHERE id = 1;
COMMIT;

-- Transaction with rollback
BEGIN;
DELETE FROM employees WHERE id = 1;
-- Oops, wrong employee
ROLLBACK;

-- Savepoints
BEGIN;
UPDATE employees SET salary = salary * 1.05;
SAVEPOINT my_savepoint;
UPDATE employees SET salary = salary * 1.05 WHERE department_id = 1;
-- Oops, only wanted first update
ROLLBACK TO SAVEPOINT my_savepoint;
COMMIT;

-- Transaction isolation levels
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Your queries here
COMMIT;
```

## 22. Views and Materialized Views

### Views
```sql
-- Create view
CREATE VIEW high_earners AS
SELECT id, first_name, last_name, salary
FROM employees
WHERE salary > 70000;

-- Query view
SELECT * FROM high_earners;

-- Drop view
DROP VIEW high_earners;

-- Updatable views (PostgreSQL supports automatic updates for simple views)
CREATE VIEW it_employees AS
SELECT * FROM employees WHERE department_id = 1;

UPDATE it_employees SET salary = salary * 1.1;  -- Updates base table
```

### Materialized Views (PostgreSQL-specific)
```sql
-- Create materialized view
CREATE MATERIALIZED VIEW dept_summary AS
SELECT 
    department_id,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary,
    MAX(salary) as max_salary
FROM employees
GROUP BY department_id;

-- Query materialized view
SELECT * FROM dept_summary;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW dept_summary;

-- Refresh concurrently (doesn't lock)
REFRESH MATERIALIZED VIEW CONCURRENTLY dept_summary;

-- Drop materialized view
DROP MATERIALIZED VIEW dept_summary;
```

## 23. Common Patterns

### Find Duplicates
```sql
SELECT email, COUNT(*)
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

### Delete Duplicates (Keep One)
```sql
DELETE FROM employees
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn
        FROM employees
    ) t
    WHERE t.rn > 1
);
```

### Top N per Group
```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rn
    FROM employees
) ranked
WHERE rn <= 3;
```

### Pivot Data (Using CROSSTAB)
```sql
-- Enable tablefunc extension
CREATE EXTENSION IF NOT EXISTS tablefunc;

-- Pivot example
SELECT * FROM CROSSTAB(
    'SELECT department_id, EXTRACT(YEAR FROM hire_date)::INTEGER, COUNT(*)
     FROM employees
     GROUP BY department_id, EXTRACT(YEAR FROM hire_date)
     ORDER BY 1, 2'
) AS ct(department_id INTEGER, "2020" BIGINT, "2021" BIGINT, "2022" BIGINT);
```

### Pivot with CASE (Manual)
```sql
SELECT 
    SUM(CASE WHEN department_id = 1 THEN salary ELSE 0 END) AS dept_1_total,
    SUM(CASE WHEN department_id = 2 THEN salary ELSE 0 END) AS dept_2_total,
    SUM(CASE WHEN department_id = 3 THEN salary ELSE 0 END) AS dept_3_total
FROM employees;
```

### Generate Series (PostgreSQL-specific)
```sql
-- Generate numbers
SELECT * FROM generate_series(1, 10);
SELECT * FROM generate_series(1, 10, 2);  -- Step by 2

-- Generate dates
SELECT * FROM generate_series(
    '2024-01-01'::DATE,
    '2024-12-31'::DATE,
    '1 day'::INTERVAL
);

-- Fill in missing dates
WITH date_series AS (
    SELECT generate_series(
        '2024-01-01'::DATE,
        '2024-12-31'::DATE,
        '1 day'::INTERVAL
    )::DATE AS date
)
SELECT 
    ds.date,
    COALESCE(COUNT(e.id), 0) AS hires
FROM date_series ds
LEFT JOIN employees e ON e.hire_date = ds.date
GROUP BY ds.date
ORDER BY ds.date;
```

## 24. Full-Text Search

```sql
-- Basic text search
SELECT * FROM employees 
WHERE to_tsvector('english', first_name || ' ' || last_name) @@ to_tsquery('english', 'John & Doe');

-- Create text search index
CREATE INDEX idx_employee_name_fts ON employees 
USING GIN(to_tsvector('english', first_name || ' ' || last_name));

-- Search with ranking
SELECT 
    first_name,
    last_name,
    ts_rank(to_tsvector('english', first_name || ' ' || last_name), query) AS rank
FROM employees, to_tsquery('english', 'John | Jane') query
WHERE to_tsvector('english', first_name || ' ' || last_name) @@ query
ORDER BY rank DESC;
```

## 25. PostgreSQL-Specific Features

### RETURNING Clause
```sql
-- Insert and return generated ID
INSERT INTO employees (first_name, last_name)
VALUES ('John', 'Doe')
RETURNING id;

-- Update and return old and new values
UPDATE employees 
SET salary = salary * 1.1
WHERE department_id = 1
RETURNING id, first_name, salary;
```

### DISTINCT ON
```sql
-- Get highest paid employee per department
SELECT DISTINCT ON (department_id)
    department_id,
    first_name,
    salary
FROM employees
ORDER BY department_id, salary DESC;
```

### EXCLUDE Constraint
```sql
-- Ensure no overlapping date ranges (requires btree_gist extension)
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE bookings (
    room_id INTEGER,
    during TSRANGE,
    EXCLUDE USING GIST (room_id WITH =, during WITH &&)
);
```

### Listen/Notify
```sql
-- Session 1: Listen for notifications
LISTEN channel_name;

-- Session 2: Send notification
NOTIFY channel_name, 'payload data';
```

## Quick Reference - SQL Order of Execution

1. **FROM / JOIN** - Choose and combine tables
2. **WHERE** - Filter rows
3. **GROUP BY** - Group rows
4. **HAVING** - Filter groups
5. **SELECT** - Choose columns
6. **DISTINCT** - Remove duplicates
7. **ORDER BY** - Sort results
8. **LIMIT / OFFSET** - Limit results

## Practice Questions to Try

1. Find employees earning more than the average salary
2. Get the second highest salary in each department
3. Find departments with no employees
4. Calculate running totals of salaries by hire date
5. Find employees who earn more than their manager
6. Get monthly hiring trends (count of employees hired per month)
7. Find the longest gap between consecutive hire dates
8. Identify employees whose salary is above the 75th percentile
9. Use a recursive CTE to build an organizational hierarchy
10. Create a materialized view for department statistics and refresh it
11. Query JSONB data to find employees with specific skills
12. Use window functions to find salary percentile ranks
13. Implement full-text search across employee names
14. Use LATERAL join to get top 3 earners per department
15. Generate a report using CROSSTAB for monthly hiring by department
