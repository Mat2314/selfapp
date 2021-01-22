import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  public imageUploaded: boolean = false;
  public photo: File = null;

  @ViewChild('filesInput') filesInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    // this.photo = files[0];
    // console.log(this.photo);
    let file = files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e: any) {
        $('#uploaded_photo').attr('src', e.target.result);
      };

      reader.readAsDataURL(file);
      this.imageUploaded = true;
    }
  }

}
