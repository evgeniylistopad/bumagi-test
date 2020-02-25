import { Pipe, PipeTransform } from "@angular/core";
import { User } from "src/app/models/user";
import { Status } from "src/app/models/status.enum";

@Pipe({
  name: "status"
})
export class StatusPipe implements PipeTransform {
  transform(user: User) {
    let result = "";
    switch (user.status) {
      case Status.Active:
        result = "Подписка активна";
        break;
      case Status.Stoped:
        result = "Приостановлена";
        break;
      case Status.Blocked:
        result = "Заблокирован";
        break;
      default:
        result = "";
    }
    return result;
  }
}
