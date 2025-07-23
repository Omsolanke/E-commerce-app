import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
 isNewProduct = true;
  product: Product = {
    productId: 0,
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  productImages: FileHandle[] = [];
  isDragOver = false;

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
   this.product = this.activateRoute.snapshot.data['product'] 

   if(this.product && this.product.productId){
    this.isNewProduct = false;
   }
  }

  // Drag-and-Drop Handlers
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files);
      this.addFiles(files);
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.addFiles(Array.from(event.target.files));
    }
  }

  addFiles(files: File[]) {
    for (const file of files) {
      if (!this.productImages.some(img => img.file.name === file.name)) {
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
          type: undefined
        };
        this.productImages.push(fileHandle);
      }
    }
  }

  removeImage(index: number): void {
    this.productImages.splice(index, 1);
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    this.productImages.forEach((img) => {
      formData.append('imageFile', img.file, img.file.name);
    });
    return formData;
  }

  addProduct(form: NgForm): void {
    if (form.valid) {
      const productFormData = this.prepareFormData(this.product);
      this.productService.addProduct(productFormData).subscribe({
        next: () => {
          alert('Product added successfully!');
          form.resetForm();
          this.productImages = [];
        },
        error: (err) => {
          console.error(err);
          alert('Error saving product.');
        }
      });
    } else {
      alert('Please fill the form correctly.');
    }
  }

  clearForm(form: NgForm): void {
    form.resetForm();
    this.productImages = [];
  }
}
