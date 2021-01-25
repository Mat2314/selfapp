import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private imageService: ImageService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close({ "deleted": false });
  }

  deletePicture() {
    this.imageService.deletePicture(this.data.picture_id).subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this.dialogRef.close({ "deleted": true, "message": res.message });
        }
      }, err => {
        console.log(err);
      }
    );
  }

}
