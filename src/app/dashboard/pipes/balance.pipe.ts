import { User } from "./../../models/user";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "balance"
})
export class BalancePipe implements PipeTransform {
  transform(user: User): string {
    const formatter = new Intl.NumberFormat("ru");
    const { balance } = user;
    if (balance) {
      return `Баланс: ${formatter.format(Number(user.balance.toFixed(2)))}`;
    }
    return "Баланс: ";
  }
}
