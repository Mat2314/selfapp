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

  public imageForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    caption: new FormControl("", [])
  });

  @ViewChild('filesInput') filesInput: ElementRef;

  constructor(private imageService: ImageService, private _snackBar: MatSnackBar, private router: Router) { }

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
    var date = this.imageForm.controls.date.value;
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

}
