import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
// import * as Razorpay from 'razorpay';


declare var Razorpay:any;
@Component({
  selector: 'app-buy-product',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton, MatIconModule, CommonModule],
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout: boolean = false;
 productDetails: Product[]= [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId :'',
    orderProductQuantityList: []

  };

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

 ngOnInit(): void {
  this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
  
  const param = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
  this.isSingleProductCheckout = param === 'true';

  this.productDetails.forEach(
    x => this.orderDetails.orderProductQuantityList.push({
      productId: x.productId,
      quantity: 1
    })
  );

  console.log(this.productDetails);
  console.log(this.orderDetails);
}

  public placeOrder(orderForm:NgForm){
  this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
    response => {
      console.log("Order placed successfully:", response);
      orderForm.resetForm();
      this.router.navigate(["/orderConfirmation"]);
    },
    error => {
      console.error("Error placing order:", error);
    }
  );
}

public getQuantityForProduct(productId: number) {

  const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
    (productQuantity) => productQuantity.productId === productId
  );

  return filteredProduct[0].quantity;
}

getCalculatedPrice(productId: number, productDiscountedPrice: number){

   const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
    (productQuantity) => productQuantity.productId === productId
  );

  return filteredProduct[0].quantity * productDiscountedPrice;
}

onQuantityChanged(quantity: number,productId: number) {
  this.orderDetails.orderProductQuantityList.filter(
    (productQuantity) => productQuantity.productId === productId
  )[0].quantity = quantity;
}

getCalculatedGrandTotal(){
  let grandTotal = 0;
  this.productDetails.forEach(product => {
    grandTotal += this.getCalculatedPrice(product.productId, product.productDiscountedPrice);
  });
  return grandTotal;
}

createTransactionAndPlaceOrder(orderForm:NgForm){
  let amount = this.getCalculatedGrandTotal();
  this.productService.createTransaction(amount).subscribe(
    (response) =>{
      console.log(response);
      this.openTransactionModal(response, orderForm);
    },
    (error) =>{
      console.log(error);
    }
  );
}

openTransactionModal(response:any, orderForm:NgForm){
  var options = {
    order_id : response.order_id,
    key: response.key,
    amount:response.amount,
    currency : response.currency,
    name :"om solanke",
    description :"Payement of online shopping",
    image :'https://cdn.pixabay.com/photo/2025/07/14/07/18/dog-9713381_1280.jpg',
    handler: (response:any) =>{
     if(response != null && response.razorpay_payment_id != null){
         this.processResponse(response, orderForm);
     }else {
      alert("Payment failed..")
     }

      


    },
    prefill:{
      name:"VENOMSADDA",
      email:"OMSOLANKE.COM",
      contact:'9021572963'
    },
    notes:{
      address:'Online Shopping',
    },
    theme:{
      color:'#F37254'
    }
  };
var razorPayObject = new Razorpay(options);
razorPayObject.open();

}
processResponse(resp:any, orderForm:NgForm){
  this.orderDetails.transactionId = resp.razorpay_payment_id;
  this.placeOrder(orderForm);
}

}
