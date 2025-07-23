import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';
import { CommonModule } from '@angular/common';

// Define DialogData interface or import it from its module
export interface DialogData {
  images(images: any): unknown;
  // Add properties as needed, e.g.:
  // images: string[];
}

@Component({
  selector: 'app-show-product-images-dialog',
  imports: [CommonModule, MatDialogActions, MatDialogModule],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css']
})
export class ShowProductImagesDialogComponent  implements OnInit{

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.receiveImages();
  }
  receiveImages(){
    console.log(this.data);
  }

}
