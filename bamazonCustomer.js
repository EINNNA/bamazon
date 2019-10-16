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

connection.connect(function(err) {
    if (err) throw err.message;
    
});

    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err.message; 
        console.table(res);
    });
        function buyingItem() {
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
                    }.then(answers => {
                        inquirer.prompt([
                            { 
                                type: 'input',
                                name: 'buyingItem',
                                message: 'How many do you want to buy?',
                        }.then(answers => {
                            function buyingAmount(){
                                connection.query(
                                    "UPDATE products SET ?",
                                    {
                                    stock_quantity: answers.buyingItem.stock_quantity--
                                    }
                                )
                            }
                        buyingAmount();
                        })
                ]);
    };