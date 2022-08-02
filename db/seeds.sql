INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Software Engineer', 120000, 2), 
  ('Customer Service Representative', 35000, 1),
  ('Lawyer', 200000, 4),
  ('Accountant', 160000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Kevin', 'Tupik', 2, 1),
  ('Barbara', 'Jenson', 3, 1),
  ('Sophie', 'Turner', 4, NULL),
  ('Jeremiah', 'Brown', 4, 4),
  ('Joshua', 'Ryan', 5, 4);
 