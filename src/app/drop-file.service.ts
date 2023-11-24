import { Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Injectable({
  providedIn: 'root'
})
export class DropFileService {

  public files:NgxFileDropEntry[] = [];
  imageChosen:boolean = false;
  imageName:string = '';
  imageSource: string = '';

  constructor() { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.imageName = this.files[0].relativePath;
    this.imageSource = 'assets/img/profiles/' + this.imageName;
    this.imageChosen = true;
  }
}
