var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    start();
});

function start(){
    console.log("\x1b[35m%s\x1b[0m", "Welcome to Supervisor Page");
    console.log("--------------------------");
    inquirer.prompt(
        [
            {
                name: "department",
                type: "list",
                message: "View Product Sales by Department",
                choices:[
                    "View Product Sales by Department",
                    "Create New Department",
                ]
            }
        ]
    )
    .then(function(answer){
            switch(answer.department){
                case "View Product Sales by Department":
                viewDepartment();
                break;

                case "Create New Department":
                newDepartment();
                break;
            }
    });
}


function viewDepartment(){
    
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, '; // columns from table departments
    query += 'products.department_name, SUM(products.product_sales) AS product_sales, '; // columns from table products
    query += 'SUM(product_sales - departments.over_head_costs) AS total_profit '; // create column total_profit
    query += 'FROM departments LEFT JOIN products ON departments.department_name = products.department_name '; // join 2 tables
    query += 'GROUP BY departments.department_name ORDER BY departments.department_id ASC'; // group result
     connection.query(query, function(err, res){
         if(err) throw err;

        console.log("\x1b[31m%s\x1b[0m","Here is table!!");
        for (var i = 0; i < res.length; i++){
            
        var table = new Table({ chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }} );

        table.push(
            ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
            [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]
        );
        console.log(table.toString());
    }
            start();
    });
}

function newDepartment() {
    
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "Enter name of new department:"
      },
      {
        name: "cost",
        type: "input",
        message: "New department over head costs:"
      }
    ])
    .then(function(answer) {
        var query = "INSERT INTO departments SET ?";
        connection.query(query, 
            {
                department_name: answer.department,
                over_head_costs: answer.cost
                
            },function(err, data){
                if (err) throw err;
                //console.log(data);
                console.log("New department name has been added!");
          
          connection.end();
          start();
        });
      }); 
  }