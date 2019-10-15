//PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk");

//CONNECTION
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "asdfgh",
    database: "bamazon"

});

//VARIABLES
var productArray = [];


connection.connect(function(err) {
    if (err) throw err.message;
});
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err.message; 
        console.table(res);
        inquirer.prompt([
            { 
                type: 'list',
                name: 'buyingItem',
                message: 'Which item do you want to buy?',
                choices: function () {
                    var choices = [];
                    res.forEach(function (product) {
                        choices.push(chalk.green("Price: $") + product.price + " || " + chalk.green("Product: ") + product.product_name);
                    });
                    return choices;
                }
                

        }])
        }
    "UPDATE"
    );


