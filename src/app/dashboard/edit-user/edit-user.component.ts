import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { DropdownOption } from 'src/app/components/dropdown/dropdown.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
 
  header: string;
  user: User;
  editUserForm: FormGroup;

  statusOptions: DropdownOption[];

  constructor(
    public dialogRef:MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
    this.user = {... this.data};
    this.header = `${this.user.mname} ${this.user.fname}`;

    this.statusOptions = [
      {value: 0, label: "Активен"},
      {value: 1, label: "Приостановлен"},
      {value: 2, label: "Заблокирован"},
    ]

    this.editUserForm = new FormGroup({
      "name": new FormControl(this.user.name),
      "fname": new FormControl(this.user.fname),
      "mname": new FormControl(this.user.mname),
      "status": new FormControl(this.user.status)
    })

    this.editUserForm.controls.name.valueChanges.subscribe(name => this.user.name = name)
    this.editUserForm.controls.fname.valueChanges.subscribe(fname => this.user.fname = fname)
    this.editUserForm.controls.mname.valueChanges.subscribe(mname => this.user.mname = mname)
    this.editUserForm.controls.status.valueChanges.subscribe(status => this.user.status = status)
  }

  get f() { return this.editUserForm.controls; }
  
  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.user);
  }
}
