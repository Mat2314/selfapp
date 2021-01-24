import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ImageService } from 'src/app/services/image.service';
import { InfoComponent } from 'src/app/snackbars/info/info.component';


@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  public imageUploaded: boolean = false;
  public photo: File = null;
  public todayDate: Date;

  public imageForm: FormGroup = new FormGroup({
    date: new FormControl(this.setTodayDate(), [Validators.required]),
    caption: new FormControl("", [])
  });

  @ViewChild('filesInput') filesInput: ElementRef;

  constructor(private imageService: ImageService, private _snackBar: MatSnackBar, private router: Router) {
    this.setTodayDate();
  }

  ngOnInit(): void {
  }

  onFileChange(files: FileList) {
    // this.photo = files[0];
    // console.log(this.photo);
    this.photo = files[0];
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

  uploadImage() {
    var date = formatDate(this.imageForm.controls.date.value, 'yyyy-MM-dd', 'pl');
    var caption = this.imageForm.controls.caption.value;

    this.imageService.uploadImage(this.photo, date, caption).subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this._snackBar.openFromComponent(InfoComponent, {
            data: {
              content: res.message
            }
          });
          this.resetImageForm();
          this.router.navigate(['/nav/timeline']);
        }
      }, err => {
        console.log(err);
      }
    );
  }

  resetImageForm() {
    this.imageForm.reset();
    this.photo = null;
    this.imageUploaded = false;
  }

  setTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();

    this.todayDate = new Date(yyyy, mm, dd);
    return this.todayDate;
  }

}
