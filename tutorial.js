class product {
    productType;
    proPrice;
    prodQuantity;
}

//Declaration of global variables
let listOfBuyers = [];
let ListOfProducts = [{ productType: "PRODUCT1", proPrice: 10, prodQuantity: 10 },
{ productType: "PRODUCT3", proPrice: 10, prodQuantity: 10 }, { productType: "PRODUCT2", proPrice: 10, prodQuantity: 10 }];
var table = document.getElementById("tblListProducts");
var isBought = false;
var buyerEmail = "";
DisplayListOfProducts();


/**Add Stock SEction */
function saveToList() {
    //Declaring user input
    var price = parseFloat(document.getElementById("txtPrice").value);
    var quantity = parseInt(document.getElementById("txtQuantity").value);
    var productType = document.getElementById("selProductType").value;


    //Testing if captured values are correct
    if (!isNaN(price) && !isNaN(quantity) && productType != "--Select--") {
        //Create product
        let myNewProduct = new product();
        myNewProduct.prodQuantity = quantity;
        myNewProduct.proPrice = price;
        myNewProduct.productType = productType;

        //Check product on list and update
        ListOfProducts.forEach(element => {

            //When product is found
            if (myNewProduct.productType === element.productType) {
                //update average price
                element.proPrice = (element.proPrice + myNewProduct.proPrice) / 2

                //update product quantity
                element.prodQuantity += myNewProduct.prodQuantity;

                //Notify user about successful addition of product
                alert("Product Successfully Added");
            }
        });
    } else {
        alert("Please enter valid input")
        return;
    }
    DisplayListOfProducts();
}

/** Display products */
function DisplayListOfProducts() {
    var listString = "";

    //Build Table headers
    var headerString = "<thead><td>Product Type</td><td>Quantity</td><td>Price </td></thead>"

    //Loop through list to build html elements for table rows and cells
    ListOfProducts.forEach(element => {
        listString += "<tr><td> " + element.productType + " </td><td> "
            + element.prodQuantity + "</td><td> "
            + element.proPrice.toString() + "</td></tr>";
    });
    //Set string to table for display
    table.innerHTML = headerString + listString;
}

/** Remove Items Section*/
function buyItems() {
    //User Input
    var buyerQuantity = document.getElementById("txtItemsBought").value;
    var buyerProductType = document.getElementById("selBuyerProductType").value;

    //Test if email has not been used before
    isAlreadyBought();
    if (isBought) {
        alert("You have already bought items, ask a friend to buy for you. Thank you", "Warning");
    } else {
        /** New buyer section **/

        //Test is quantity and product type are Valid
        if (buyerQuantity > 0 && buyerProductType != "--Select--") {
            //Select correct product type
            ListOfProducts.forEach(saleProduct => {
                if (buyerProductType === saleProduct.productType) {
                    if (buyerQuantity <= saleProduct.prodQuantity) {

                        //Update product quantity
                        saleProduct.prodQuantity -= buyerQuantity;

                        //Add buyer to buyers list
                        listOfBuyers.push(buyerEmail);
                        alert("You have successfully bought Items");

                        //Display updated list of products
                        DisplayListOfProducts();
                        return;
                    } else {
                        alert("Please enter a valid quantity");
                        return;
                    }
                }
            })
        } else {
            alert("Please check the quantity and/or selected product")
        }
    }
}

/** Test if email address is not recorded on the system */
function isAlreadyBought() {
    //reset test value
    isBought = false;

    //Get email input from user
    buyerEmail = document.getElementById("txtEmail").value;

    //Test if list is not empty
    if (isNaN(buyerEmail) && buyerEmail != null) {
        if (listOfBuyers != null) {
            //For every item on List tests if its not the same as the incoming email
            listOfBuyers.forEach(email => {
                //Set isBougt to true if email is found on List
                if (buyerEmail.toString() == email.toString()) {
                    isBought = true;
                }
            })
        }
    } else {
        alert("Please enter a valid email");
        return;
    }
}