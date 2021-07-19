import { Component } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BitCube Tutorial';
  isBought: boolean = false;
  listOfBuyers: string[] = [];
  buyerEmail: string = "";
  buyerQuantity: number = 0;
  buyerProductType: string = '--Select--';
  newProductType: string = '--Select--';
  newProductPrice: number = 0;
  newProductQuantity: number = 0;
  listOfProducts: Product[] = [{ productType: "PRODUCT1", productPrice: 10, productQuantity: 10 },
  { productType: "PRODUCT3", productPrice: 10, productQuantity: 10 }, { productType: "PRODUCT2", productPrice: 10, productQuantity: 10 }];

  saveToList() {
    if (!isNaN(this.newProductQuantity) && !isNaN(this.newProductPrice) && this.newProductType != "--Select--") {
      //Create product
      let myNewProduct = new Product();
      myNewProduct.productQuantity = parseFloat(this.newProductQuantity.toString());
      myNewProduct.productPrice = parseFloat(this.newProductPrice.toString());
      myNewProduct.productType = this.newProductType;

      //Check product on list and update
      this.listOfProducts.forEach(element => {

        //When product is found
        if (myNewProduct.productType === element.productType) {
          //update average price
          element.productPrice = (element.productPrice + myNewProduct.productPrice) / 2

          //update product quantity
          element.productQuantity += myNewProduct.productQuantity;

          //Notify user about successful addition of product
          alert("Product Successfully Added");
        }
      });
    } else {
      alert("Please enter valid input")
      return;
    }
  }

  /** Remove Items Section*/
  buyItems() {
    //Test if email has not been used before

    this.isAlreadyBought();
    if (this.isBought) {
      alert("You have already bought items, ask a friend to buy for you. Thank you");
    } else {
      /** New buyer section **/

      //Test is quantity and product type are Valid
      if (this.buyerQuantity > 0 && this.buyerProductType != "--Select--") {
        //Select correct product type

        this.listOfProducts.forEach(saleProduct => {
          if (this.buyerProductType === saleProduct.productType) {
            if (this.buyerQuantity <= saleProduct.productQuantity) {
              console.log("Here");
              //Update product quantity
              saleProduct.productQuantity -= this.buyerQuantity;

              //Add buyer to buyers list
              this.listOfBuyers.push(this.buyerEmail);
              alert("You have successfully bought Items");
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
  isAlreadyBought() {
    //reset test value
    this.isBought = false;

    //Test if list is not empty
    if (this.buyerEmail != null) {
      if (this.listOfBuyers != null) {
        //For every item on List tests if its not the same as the incoming email
        this.listOfBuyers.forEach(email => {
          //Set isBougt to true if email is found on List
          if (this.buyerEmail.toString() == email.toString()) {
            this.isBought = true;
          }
        })
      }
    } else {
      alert("Please enter a valid email");
      return;
    }
  }
}

export class Product {
  productType!: string;
  productPrice!: number;
  productQuantity!: number;
}