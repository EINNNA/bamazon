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
connection.connect(function (err) {
    if (err) throw err.message;
    table();
});

function table() {
    connection.query(
        "SELECT * FROM products", (err, res) => {
            if (err) throw err.message;
            console.table(res);
            buyingItem();
        });
}

function buyingItem() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'buyingItem',
            message: 'Which item do you want to buy?',
            choices: function () {
                var choices = [];
                res.forEach(function (product) {
                    choices.push(chalk.green("SKU") + product.item_id + " || " + chalk.green("Price: $") + product.price + " || " + chalk.green("Product: ") + product.product_name);
                });
                return choices;
            }
        }]).then(answers => {
            var amount = parseInt(answers.itemAmount);
            var itemBought = answers.buyingItem;

            if (itemBought == product.product_name && amount > 0) {
                connection.query(
                    "UPDATE products SET stock_quantity WHERE 'item_id' =" + itemBought + ";"
                )
            } else {
                console.log("Out of stock, we are not able to supply this, please pick another item")
                buyingItem();
            }
        });
};

buyingItem();
