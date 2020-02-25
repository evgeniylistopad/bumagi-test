import { AuthService } from "./../../services/auth.service";
import { User } from "./../../models/user";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UsersService } from "../users.service";
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: "user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"],
})
export class UserCardComponent implements OnInit {
  
  _user: User;
  get user(): User {
    return this._user;
  }
  @Input('user') 
  set user(value: User){
    this._user = value;
  }

  @Output() dialogOpened: EventEmitter<any> = new EventEmitter<any>();
  @Output() dialogClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() userChanged: EventEmitter<User> = new EventEmitter<User>();

  avatarUrl$;

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.avatarUrl$ = this.usersService.getAvatar(this.user.avatar)
  }

  openDialog() {
    this.dialogOpened.emit(true);
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '916px',
      data: this._user,
      backdropClass: 'backdropBackground',
      panelClass: 'user-edit-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.userChanged.emit(result)
      }
      this.dialogClosed.emit(true);
    })
  }
}
