
DROP DATABASE bamazonIndustrial;

CREATE DATABASE bamazonIndustrial;

USE bamazonIndustrial;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
department_name VARCHAR (30) NOT NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Medium_air_compressor", "Machines", 300, 5);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Grinder", "Air_tools", 60, 10);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Air_tool_oil", "Consumables", 7, 50);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Grinding_wheels", "Consumables", 5, 200);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Sanding_wheels", "Consumables", 5, 500);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Large_air_compressor", "Machines", 750, 10);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Air_hose", "Air_tools", 20, 20);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUE ("Hammer", "Hand_tools", 15, 20);

INSERT INTO products (name, department_name, price, stock_quantity)
Value ( "Cutting_Torch", "Welding", 70, 70);

INSERT INTO products (name, department_name, price, stock_quantity)
Value ( "Mig_wire", "Consumables", 70, 70);

SELECT * FROM products;
