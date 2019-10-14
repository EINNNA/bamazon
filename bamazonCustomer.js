var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "asdfgh",
    database: "bamazon"

});

connection.connect(function(err) {
    if (err) throw err.message;
});

var products = res.products;

    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err.message; 
        console.table(res)  
        inquirer.prompt([
            { 
                type: 'list',
                name: 'buyingItem',
                message: 'Which item do you want to buy?',
                options: [
                    products.forEach(item) => { 
                        
                    }
                ]

        }])
        }
    );


