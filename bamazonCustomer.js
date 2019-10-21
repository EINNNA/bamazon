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
        "SELECT item_id, product_name, price, stock_quantity FROM products", (err, res) => {
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

        for (i = 0; i < res.length; i++) {
            var stockQty = res[i].stock_quantity;
            var newStock = stockQty - amount;
            var itemBuying = res[i].item_id;
            var cost = res[i].price * amount;

            if (itemBuying == itemBought && stockQty > 0){
                connection.query(
                    "UPDATE products SET ? WHERE?",
                    [
                        { stock_quantity: newStock },
                        { item_id: itemBuying}
                    ], function (err, res) {
                        if (err) throw err;
                        console.log("You've bought " + amount + " pieces of " + res[i].product.name + ". It will cost you $" + cost);
                        table();
                    }
                );
            }
        }
        
    });
};