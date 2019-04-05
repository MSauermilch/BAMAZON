//dependencies
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
    database: "BamazonIndustrial"
    //----------create a keys file-------------------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<<<
  });

  connection.connect(function(err) {
    if (err) throw err;
    // Sends "welcome" message when connected and loads catalog.
    console.log("\nWelcome to Bamazon! Please check out our selects.\n");
    catalog();
  })

  var selectInfo = [];
  var catalogLength  = 0;

    function catalog() {

        connection.query("SELECT * FROM products", function(err, results){ 
            catalogLength = results.length;
            if (err) throw err;
            for(i=0; i<results.length; i++){
                console.log("Item #: " + results[i].id);
                console.log("Item Name: " + results[i].name);
                console.log("Department: " + results[i].department_name);
                console.log("Price: $" + results[i].price);
                console.log("\n");
                };
              }); 
    };

    function productNumber() {
        inquirer.prompt ([
          {
            type: "input",
            message: "What Product would you care to order? Please enter item name. \n",
            name: "productNumber"
            }
        ]).then(function (answer) {
            if (!isNaN(answer.productNumber) && answer.productNumber <=  catalogLength && !undefined ){ /// <---------- "!unfined"
              selectInfo.push(parseInt(answer.productNumber));
              quantity();
            } else {
              console.log("Please select an item number from the catalog \n");
              productNumber(); 
            };
          });
    };

    setTimeout( function(){
      productNumber()
    }, 500);

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
            console.log("     Product#: " + selectInfo[0]); // "+1" might be problematic 
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

          var query = connection.query( "UPDATE products SET ? WHERE ?",
            [{ stock_quantity: (results[selectInfo[0]].stock_quantity - selectInfo[1])
              },
            { id: selectInfo[0]
              }],
            function(err, res) {
              console.log(res.affectedRows + " products updated!\n");
              // Call deleteProduct AFTER the UPDATE completes
              //deleteProduct();
            }
          );
          
          // logs the actual query being run
          //console.log(query.sql);
        });
        console.log("\nOrder placed, Thank you");

      };
   
    

      //would you like to place another order? if no connection.end()
