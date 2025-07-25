import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}


 public createTransaction(amount:any){
      return this.httpClient.get("http://localhost:9090/createTransaction/"+amount);

    }


      public markAsDelivered(orderId: any){
      return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId);

    }

    public getAllOrderDetailsForAdmin(status:string): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
  }


  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public deleteCartItem(cartId: any){
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public addProduct(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

public getAllProducts(pageNumber: string | undefined, searchKey: string | undefined = ""): Observable<Product[]> {
  return this.httpClient.get<Product[]>(`http://localhost:9090/getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKey}`);
}


  public getProductDetailsById(productId: number){
    return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

    public deleteProduct(productId: number){
       return this.httpClient.delete("http://localhost:9090/deleteProductDetails/" +productId);
    }

    public getProductDetails(isSingleProductCheckout: any, productId: any){
      return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+ isSingleProductCheckout + "/" + productId);
    }

    public placeOrder(orderDetails: OrderDetails, isCartCheckout:any){
      return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
    }

    public addTocart(productId: any){
      return this.httpClient.get("http://localhost:9090/addToCart/"+ productId);

    }
     public getCartDetails(){
      return this.httpClient.get("http://localhost:9090/getCartDetails/");

    }
  }

