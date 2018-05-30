var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Shenlushan0523",
    database: "bamazonDB"
  });

  connection.connect(function(err){
      if (err) throw err;
       // run the start function after the connection is made to prompt the user
      runSearch();
  });

  function runSearch(){
      console.log("\x1b[35m%s\x1b[0m", "Welcome to Bamazon!!!");
      console.log("--------------------------");
      inquirer.prompt([
          {
              //type your products ID. If the value < 0, return false
              name: "item_id",
              type: "input",
              message: "The ID of product you would like to buy:",
              validate: function(value) {
                if ((value) > 0) {
                  return true;
                } else {
                console.log("\n\x1b[31m%s\x1b[0m", "Please enter a ID number~")};
              }
          },
          {
              name: "quantity",
              type: "input",
              message: "How many units of the product you would like to buy?",
              validate: function(value) {
                if ((value) > 0) {
                  return true;
                } else {
                console.log("\n\x1b[31m%s\x1b[0m", "Please enter a ID number~")};
              }
          }]
      )
      .then(function(answer){
        var item = answer.item_id;
        var quantity = answer.quantity;
        

        console.log("Item ID: " + item + "\n" + "Numbers: " + quantity);
        console.log("--------------------------");

        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id: item}, function(err, res){
            if(err) throw err;
            
            if (res.length === 0) {
				console.log("\n\x1b[31m%s\x1b[0m", "ERROR: Invalid Item ID. Please select a valid Item ID.");
                runSearch();

            } else {
            var productsData = res[0];
            var productSales = productsData.product_sales;
            var stockQuantity = productsData.stock_quantity;
            var totalPrice = productsData.price * answer.quantity;
            console.log(productsData);
            //console.log(totalPrice);
            console.log("--------------------------");

            if (parseInt(quantity) <= stockQuantity){
                console.log("\x1b[32m%s\x1b[0m","Congratulation! the product you requested is in stock!");
                connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: stockQuantity - quantity,
                        product_sales: productSales + totalPrice
                    },
                    {
                        item_id: item
                    }
                ], 
                function(err){
                    if (err) throw err;
                    
                    console.log("\x1b[32m%s\x1b[0m", "Thank you for your purchase! The total price is: $" + totalPrice +".");
                    // console.log("after: " + stockQuantity);
                    connection.end();
                }
            );
            } else {
                console.log("\x1b[31m%s\x1b[0m","Sorry, there is not enough product in stock, your order can not be placed as is.");
                console.log('Please modify your order.');
                runSearch();
            }
        };
        });
      });
  }