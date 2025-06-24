import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css'],
})
export class RoomDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const isEditMode = !!data?.id;

    this.form = this.fb.group({
      id: [data?.id],
      number: [data?.number || '', Validators.required],
      type: [data?.type || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]],
      available: [{ value: data?.available ?? true, disabled: !isEditMode }],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue(); // récupère aussi les champs désactivés
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
