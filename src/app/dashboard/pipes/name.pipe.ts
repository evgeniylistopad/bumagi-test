import { User } from "./../../models/user";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "name"
})
export class NamePipe implements PipeTransform {
  transform(user: User): string {
    return `${user.fname} ${user.name[0]}. ${user.mname[0]}.`;
  }
}
