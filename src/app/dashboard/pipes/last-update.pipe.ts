import { Pipe, PipeTransform } from "@angular/core";
import { User } from "src/app/models/user";

@Pipe({
  name: "lastUpdate"
})
export class LastUpdatePipe implements PipeTransform {
  transform(user: User): string {
    if (user.lastUpdatedAt) {
      const lastUp = new Date(user.lastUpdatedAt).getTime();
      const now = new Date().getTime();
      let delta = Math.round((now - lastUp) / 1000);
      if (delta < 0) {
        delta = 0;
      }
      let result;
      if (delta < 60) {
        result = `${delta} секунд${this.ending(delta)}`;
      } else {
        let min = Math.floor(delta / 60);
        let sec = delta % 60;
        result = `${Math.round(min)} минут${this.ending(min)} ${Math.round(
          sec
        )} секунд${this.ending(sec)}`;
      }
      return `Последнее изменение: ${result} назад`;
    }
    return "";
  }

  ending(number: number) {
    if (number > 20) number = number % 10;
    switch (number) {
      case 0:
        return "";
      case 1:
        return "у";
      case 2:
        return "ы";
      case 3:
        return "ы";
      case 4:
        return "ы";
      default:
        return "";
    }
  }
}
