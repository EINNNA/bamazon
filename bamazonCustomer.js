//PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");

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
            buyingItem(res);
        });
}

function buyingItem(res) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'buyingItem',
            message: 'Which item do you want to buy(Use Item ID)?'
        },
        {
            type: 'input',
            name: 'itemAmount',
            message: 'How many do you want to buy?'
        }
    ]).then(answers => {
        console.log("Thanks for your selections. Checking to see if Item is in stock..")
        var amount = parseInt(answers.itemAmount);
        var itemBought = answers.buyingItem;
        var newStock = res.stock_quantity;
        console.log(newStock)
        connection.query(
            "SELECT stock_quantity, item_id FROM products",
            function (err, res) {
                console.table(res);
                if (err) throw err;
                if (amount < res.stock_quantity && itemBought == res.item_id) {
                    connection.query(
                        "UPDATE products SET ?",
                        [
                            { stock_quantity: newStock },
                        ], function (err, res) {
                            if (err) throw err;
                            console.log("You've bought " + amount + " pieces of " + itemsbought + ". It will cost you $" + cost);
                            console.table(res);
                        }
                    );
                }
            }
        )
    });
};