//dependencies
var mysql = require ("mysql");
var inquirer = require("Inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "PizzaPizza69",
    database: "bamazonindustrial"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // Sends "welcome" message when connected and loads catalog.
    console.log("\nWelcome to Bamazon! Please check out our selects.\n");
    catalog();
  })
    
  // Prints out catalog items from database
    function catalog() {
        connection.query("SELECT * FROM products", function(err, results){
            catalogLength  = 0; 
            catalogLength = results.length;

            if (err) throw err;
            for(i=0; i<results.length; i++){
                console.log("Item #: " + results[i].id + "\n" +
                            "Item Name: " + results[i].name + "\n" + 
                            "Department: " + results[i].department_name + "\n" + 
                            "Price: $" + results[i].price + "\n");
                };

            productNumber();
          }); 
    };
  
  //Questions Product item
    function productNumber() {
        inquirer.prompt ([
          {
            type: "input",
            message: "What Product would you care to order? \n Please enter Item #. \n",
            name: "productNumber"
            }
        ]).then(function (answer) {
            UserProdChoice = (answer.productNumber - 1);

            // Product number validation.
            if (!isNaN(UserProdChoice) && UserProdChoice <=  catalogLength && !undefined ){
              selectInfo = [];
              selectInfo.push(parseInt(UserProdChoice));
              quantity();
            } else {
              console.log("Please select an Item # from the catalog. \n");
              productNumber(); 
            };
          });
    };
  //Questions Product quanity 
    function quantity() {
          inquirer.prompt ([
            {
              type: "input",
              message: "What quanity of Product would you like to order? \n",
              name: "quantityProduct" //var for product quantity
              }
          ]).then(function (answer) {
              if (!isNaN(answer.quantityProduct)) {
                selectInfo.push(parseInt(answer.quantityProduct));
                orderDetails();
              } else {
                console.log("Please select a quantity of products you would like to purchase \n");
                quantity();
              };
              })
    };

    // Order Comformation 
    function orderDetails(){

          connection.query("SELECT id, name, stock_quantity, price FROM products", function(err, results){
            console.log("\nOrder details");
            console.log("-----------------------------------------------------------");
            console.log("     Product#: " + (selectInfo[0] + 1)); 
            console.log("     Product Name: "+ results[selectInfo[0]].name);
            console.log("     Order quantity: " + selectInfo[1]);
            console.log("     Cost: $" +(results[selectInfo[0]].price * selectInfo[1]));
            console.log("-----------------------------------------------------------");

              if (selectInfo[1] > results[selectInfo[0]].stock_quantity){
                console.log ("Sorry, we do not have that much in stock. \n" +
                   "Quantity available: " + results[selectInfo[0]].stock_quantity + "\n");
                selectInfo.pop();
                newOrder();
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
                  console.log("\nYour order has been submitted.\n");
                } else {
                  newOrder();
                }
              });
            };
          });
  };

  //Submits Order to database and modifies inventory
    function sumbitOrder(){
      connection.query("SELECT id, stock_quantity FROM products", function(err, results){

          var query = connection.query( "UPDATE products SET ? WHERE ?",
            [{ stock_quantity: (results[selectInfo[0]].stock_quantity - selectInfo[1])
              },
            { id: (selectInfo[0] + 1)
              }],

            function(err, res) {
              console.log(res.affectedRows + " products updated!\n");
              setTimeout( function(){
                newOrder();
                }, 500);
            }
          );
        });
      };
   
    function newOrder(){
      inquirer.prompt ([
        {
          type: "confirm",
          message:"Would you like to place another order?",
          name: "nextOrder"
        }
      ]).then(function(answer)
        { if (answer.nextOrder === true){
          console.log("\nWelcome to Bamazon! Please check out our selects.\n");
          catalog();
        } else {
          console.log("\nThanks for shopping with us! Goodbye.");
          connection.end();
        }
      })
    };
