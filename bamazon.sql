DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
USE bamazonDB;
-- Create table products
CREATE TABLE products(
	item_id INT(11) not null auto_increment,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT(100),
    product_sales INT(100) NULL,
    stock_quantity INT(100),
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Beef jerky", "Food", 10, 0, 20);

INSERT INTO products(product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Chips", "Food", 3, 0, 50);

INSERT INTO products(product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Salami", "Food", 3, 0, 15);

INSERT INTO products(product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Coca-Cola", "Drink", 2, 0,,40);

INSERT INTO products(product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Milk", "Drink", 3.5, 0, 10);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Non-Stick Pan", "Cookware", 40, 0, 8);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Kitchen Knife", "Cookware", 120, 0, 4);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Encyclopaedia", "Book", 80, 0, 2);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Glove", "Tool", 10, 0, 8);

INSERT INTO products(product_name, department_name, product_sales, price, stock_quantity)
VALUES ("Hummer", "Tool", 8, 0, 5);

-- create table departments
CREATE TABLE departments(
    item_id INT(11) not null auto_increment,
	department_id INT(11) not null auto_increment,
    department_name VARCHAR(100),
    over_head_costs INT(100),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;
SELECT * FROM departmensts;