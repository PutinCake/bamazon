# bamazon

# Node.js & MySQL

### Overview

This is an Amazon-like storefront with the MySQL skills. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

### Guide

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku.

### Challenge #1: Customer View

1. Create a MySQL Database called `bamazon`.
2. Then create a Table inside of that database called `products`.
3. The products table have each of the following columns:

 * item_id (unique id for each product)
 * product_name (Name of product)
 * department_name
 * price (cost to customer)
 * stock_quantity (how much of the product is available in stores)
![pic](https://github.com/PutinCake/bamazon/blob/master/images/tableProducts.png)


 1. This database with around 10 different products. 
 2. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
 3. The app then prompt users with two messages.

*  The first should ask them the ID of the product they would like to buy.
*  The second message should ask how many units of the product they would like to buy.

 1. Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request.
 2. If not, the app will log a phrase infomation `Insufficient quantity!`, and then prevent the order from going through.
 3. However, if store does have enough of the product, the app will fulfill the customer's order.
![pic](https://github.com/PutinCake/bamazon/blob/master/images/customer.png)

* This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

### Challenge #2: Manager View 

* Create a new Node application called `bamazonManager.js`. Running this application will:
 * List a set of menu options:
 * View Products for Sale
 * View Low Inventory
 * Add to Inventory
 * Add New Product
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/manager1.png)
 * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/managero1.png)
 * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/managero2.png)
 * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/managero3.png)
 * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/managero4.png)
 ![pic](https://github.com/PutinCake/bamazon/blob/master/images/managero5.png)
 

### Challenge #3: Supervisor View

1. Create a new MySQL table called `departments`. This table includes the following columns:
 * department_id
 * department_name
 * over_head_costs (A dummy number you set for each department)
![pic](https://github.com/PutinCake/bamazon/blob/master/images/tableDepartments.png)
 1.Modify the products table so that there's a product_sales column and modify the `bamazonCustomer.js` app so that this value is updated with each individual products total revenue from each sale.
 
 2.Modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

* This app still updates the inventory listed in the products column.

1. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
 * View Product Sales by Department
 * Create New Department

1. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.
![pic](https://github.com/PutinCake/bamazon/blob/master/images/super1.png)
![pic](https://github.com/PutinCake/bamazon/blob/master/images/super2.png)
![pic](https://github.com/PutinCake/bamazon/blob/master/images/superTable.png)

## Technology
* javascript
* node.js
* npm
* mysql


## NPM
* inquirer
* mysql
* cli-table
