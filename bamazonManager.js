var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazonDB"
  });

  connection.connect(function(err){
    if (err) throw err;
     // run the start function after the connection is made to prompt the user
    checkProducts();
});

function checkProducts(){
    console.log("\n===========================");
    console.log("\x1b[35m%s\x1b[0m", "Welcome to manager page!");
    console.log("===========================");
    inquirer.prompt(
        {
            name: "option",
            type: "list",
            message: "What do you want to do?",
            choices:[
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    )
    .then(function(answer) {
        //could use switch
        switch(answer.option) {
            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addNew();
            break;
        }
    });
}

//View Products for Sale
function viewProducts() {

    connection.query("SELECT * FROM products", function(err, results){
        console.log("Here is our products detailed list: ");
        for(var i = 0; i < results.length; i++){
            console.log("\x1b[32m%s\x1b[0m", 
            "\nitem IDs: " + results[i].item_id + 
            "|| names: " + results[i].product_name + 
            "|| price: " + results[i].price + 
            "|| quantity: " + results[i].stock_quantity);
            console.log("\x1b[34m%s\x1b[0m", "--------------------------------") 
        }
        checkProducts();
    });
}

//View Low Inventory
function lowInventory(){
    connection.query("SELECT * FROM products", function(err, results){
        console.log("\x1b[33m%s\x1b[0m", "\nHere is all items with an inventory count lower than five: ");
        for(var i = 0; i < results.length; i++){
            if(results[i].stock_quantity < 5){
                console.log("\x1b[31m%s\x1b[0m", results[i].product_name + ": " + results[i].stock_quantity);
            } 
        }
        checkProducts();
    });
}

//Add to Inventory
function addInventory(){

        inquirer.prompt(
            [
            {
                name: "productID",
                type: "input",
                message: "Please enter the Item ID for stock_count update:",
                validate: function(value) {
                    if (!isNaN(value)) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                name: "number",
                type: "input",
                message: "please enter the number you want to add: ",
                validate: function(value) {
                    if (!isNaN(value)) {
                      return true;
                    }
                    return false;
                  }
            }
            ]
        )
        .then(function(answer){
            var item = answer.productID;
            var addQuantity = answer.number; 
            console.log(item + "================" + addQuantity);
            var queryStr = "SELECT * FROM products WHERE ?"
            connection.query(queryStr, {item_id: item}, function(err, result){
                if(err) throw err;
                var productData = result[0];
                console.log(productData);
                console.log("=======================");
                var a = productData.stock_quantity + parseInt(addQuantity);
                

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: productData.stock_quantity + parseInt(addQuantity)
                        },
                        {
                            item_id: item
                        }
                    ],
                    function(err) {
                        if(err) throw err;
                        console.log("\x1b[33m%s\x1b[0m", "New Inventory added!");
                        console.log("\x1b[33m%s\x1b[0m", "Now we have " + a + " " + productData.product_name + "(s).");
                        //End the database connection
                        connection.end();
                        checkProducts();

                    }
                );
            
        });
        });
}

//Add New Product
function addNew(){
    inquirer.prompt(
        [
        {
            name: "newName",
            type: "input",
            message: "Product_name: "
        },
        {
            name: "newDepartment",
            type: "input",
            message: "Department: "
        },
        {
            name: "newPrice",
            type: "input",
            message: "Price: ",
            validate: function(value) {
                if (!isNaN(value)) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Quantity: ",
            validate: function(value) {
                if (!isNaN(value)) {
                  return true;
                }
                return false;
              }
        }
    ]
    ).then(function(answer){
        var query = "INSERT INTO products SET ?";
        connection.query(query, 
            {
                product_name: answer.newName,
                department_name: answer.newDepartment,
                price: answer.newPrice,
                stock_quantity: answer.newQuantity
            },function(err,){
                if (err) throw err;
                console.log("New Product has been added!");

                checkProducts();
        });
    });
}