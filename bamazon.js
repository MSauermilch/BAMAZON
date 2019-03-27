var mysql = require ("mysql");

var inquirer = require("Inquirer");
//var key = require(key file)  ----create a keys file------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<<<

var connection = mysql.createConnection({
    host: "localhost",
    //my port
    port: 3306,
    //----------create a keys file-------------------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<<<
    user: "root",
    password: "PizzaPizza69",
    database: "bamazon"
    //----------create a keys file-------------------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<<<
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("\nWelcome to Bamazon! Please check out our selects.\n");
    start();
  })

  var selectInfo = [];

  function start() {
         connection.query("SELECT * FROM products", function(err, results){
            if (err) throw err;
            for(i=0; i<results.length; i++){
                console.log("Item #: " + results[i].id);
                console.log("Item Name: " + results[i].name);
                console.log("Department: " + results[i].department_name);
                console.log("Price: $" + results[i].price);
                console.log("\n");
                };
              });
            productNumber();
         };

         // Asynco <----------------------------------------------------------------------------------------------!!!!

  function productNumber() {
            inquirer.prompt ([
                {
                type: "input",
                message: "What Product would you care to order? Please enter item name. \n",
                name: "productNumber"
                }
            ]).then(function (answer) {
                if (!isNaN(answer.productNumber) && answer.productNumber <= 10 && !undefined ){ /// <---------- "!unfined"
                 selectInfo.push(parseInt(answer.productNumber) - 1); // <------results.length instead of "-1"
                  quantity();
                } else {
                  console.log("Please select an item number from the catalog \n");
                  productNumber();
                };
             });
            };

  function quantity() {
            inquirer.prompt ([
                {
                type: "input",
                message: "What quanity of Product would you like to order? \n",
                name: "quantityProduct" //var for product quantity
                }
            ]).then(function (answer) {
                //if (!isNaN(answer.quanityProduct && " # rep quanity in cat"))
                if (!isNaN(answer.quantityProduct)) {
                  selectInfo.push(parseInt(answer.quantityProduct));
                  orderDetails();
                } else {
                  console.log("Please select a quantity of products you would like to purchase \n");
                  quantity();
                };
            })
          };

  function orderDetails(){

            connection.query("SELECT id, name, stock_quantity, price FROM products", function(err, results){
              console.log("\nOrder details");
              console.log("-----------------------------------------------------------");
              console.log("     Product#: " + selectInfo[0]);
              console.log("     Product Name: "+ results[selectInfo[0]].name);
              console.log("     Order quantity: " + selectInfo[1]);
              console.log("     Cost: $" +(results[selectInfo[0]].price * selectInfo[1]));
              console.log("-----------------------------------------------------------");

                if (selectInfo[1] > results[selectInfo[0]].stock_quantity){
                  console.log ("Sorry, we do not have that much in stock. \n     Quantity available: " + results[selectInfo[0]].stock_quantity + "\nPlease choose another quantity. Thank you! \n");
                  selectInfo.pop();
                  quantity();
                } else {

              inquirer.prompt ([
                {
                type: "confirm",
                message: "Would you like to place this order? \n",
                name: "confirmRespone"
                }
              ]).then(function(answer){
                if (answer.confirmRespone === true){
                  sumbitOrder();
                } else {
                  productNumber();
                }
              });
            };
          });
  };

  function sumbitOrder(){
    connection.query("SELECT id, stock_quantity FROM products", function(err, results){
      console.log("\nOrder placed, Thank you");
      console.log("\nnew quantity available: " + (results[selectInfo[0]].stock_quantity - selectInfo[1]) + "\n"); // <---- update SQL
                
              // connection.query("INSERT INTO products(results[selectInfo[0]].stock_quantity"), function(err, results){

            });
    };
  
