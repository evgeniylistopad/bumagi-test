import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user";
import { UsersService } from "../users.service";
import { takeUntil } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";
import { ToastService } from "src/app/toast/toast.service";
import { Status } from 'src/app/models/status.enum';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  private _status: Status;
  get status(): Status {
    return this._status;
  }
  @Input("status")
  set status(value: Status) {
    this._status = value;
  }

  users: User[] = [];
  loading: boolean;

  private reload: Subscription;
  private destroy$: Subject<void> = new Subject();

  constructor(
    public usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.startReload();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopReload();
  }

  private updateUsers(data: User[]) {
    let updatedDataUsers = this.setNewData(data);
    let newUsers = this.getNewUsers(data);
    this.users = [...updatedDataUsers, ...newUsers];
  }

  private setNewData(data: User[]) {
    let newUsersArr: User[] = [];
    this.users.forEach(user => {
      const { id } = user;
      let newData = data.find(u => u.id === id);
      if (newData) {
        newUsersArr.push({ ...user, ...newData });
      }
    });
    return newUsersArr;
  }

  private getNewUsers(data: User[]) {
    let newUsers: User[] = [];
    data.forEach(user => {
      let { id } = user;
      let exist = this.users.find(u => u.id === id);
      if (!exist) {
        newUsers.push(user);
      }
    });
    return newUsers;
  }

  userUpdate(user: User) {
    switch(this.status) {
      case Status.Active:
        if (user.status != Status.Active) {
          this.removeFromView(user)
        } else {
          this.updateInView(user)
        }
        break;
      case Status.Blocked:
        if (user.status != Status.Blocked) {
          this.removeFromView(user)
        } else {
          this.updateInView(user)
        }
        break;
      default:
        this.updateInView(user);
    }

    this.usersService.updateUser(user).subscribe()
  }

  updateInView(user:User) {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = { ...this.users[index], ...user };
  }

  removeFromView(user:User) {
    const index = this.users.findIndex(u => u.id === user.id); 
    this.users = [
      ...this.users.slice(0, index),
      ...this.users.slice(index+1, this.users.length)
    ]
  }

  stopReload() {
    this.reload.unsubscribe();
  }

  startReload() {
    this.reload = this.usersService
      .getUsersWithReload(this.status)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        data => {
          this.loading = false;
          if (this.users.length && data instanceof Array) {
            this.updateUsers(data);
          } else if (data instanceof Array) {
            this.users = data;
          } else if (this.users.length == 0) {
            this.toastService.show({ text: (data as any).message });
            this.loading = true;
          }
        },
        err => {
          this.toastService.show({ text: err });
        },
        () => {
          this.loading = false;
        }
      );
  }
}
