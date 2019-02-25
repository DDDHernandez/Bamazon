//Install and require these npm packages
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bigd903453!",
    database: "bamazon"
});
//Connect to MYSQL and log our threadID
connection.connect(function(err) {
    if (err) throw err;
    ShowItemsforSale();
    console.log('Connected as ' + connection.threadId)
});
//Displays our products table in bamazon db
//Using inquirer get customers order
function ShowItemsforSale () {
    connection.query(
        "SELECT * FROM products", function(err, results) {
            if (err) throw err;
            for (i = 0; i < results.length; i++) {
                console.log("----------------------------------\n");
                console.log("Item Id: " + results[i].id + "\nProduct: " + results[i].product_name + 
                "\nDepartment: " + results[i].department_name + "\nPrice: $" + results[i].price + "\nQuantity: " + results[i].stock_quantity +"\n");
            }
        
            inquirer.prompt([
                {
                    name: "ItemsID",
                    type: "input",
                    message: "Please enter the id of the product you would like to purchase from bamazon: ",
                },
                {
                    name: "Quantity",
                    type: "input",
                    message: "How many would you like to buy: ",
                }
            ]).then(function(answers) {
                connection.query(
                    "SELECT * FROM products WHERE ?",
                [
                    {
                        id: answers.ItemsID  
                    }
                ]
        //Create variables to hold our db information and process customers order
            , function(err, results) {
                var bamazonStock = results[0].stock_quantity;
                var Quantity = bamazonStock - answers.Quantity;
                var ItemsPrice = results[0].price;
                var Totalcost = ItemsPrice * answers.Quantity;
            //If bamazon has enough inventory in stock then sell item(s).
                if(Quantity >= 0) {
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: Quantity
                        },
                        {
                            id: answers.ItemsID
                        }
                    ],function(err, results) {
                        if (err) throw err;
                        console.log("Your order has been placed. You have been charged $" + Totalcost);
                        connection.end();
                    })
                } 
                //if bamazon does not have enough inventory then deny request
                else {
                    console.log("Sorry for the inconvience but you are asking to much from bamazon. You can try again later or continue to shop for different items. WE APPRECIATE YOUR BUSINESS");
                    ShowItemsforSale();
                }
            })
        })
        
    })
}