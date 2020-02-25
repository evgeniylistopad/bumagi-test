import {
  Component,
  OnInit,
  ElementRef,
  Input,
  HostListener,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export class DropdownOption {
  value: string | number;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  ENTER = 13
}

@Component({
  selector: "dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  onChange = value => {};
  onTouch = value => {};

  private _currentValue: string | number;
  get currentValue() {
    return this._currentValue;
  }
  set currentValue(value: string | number) {
    this._currentValue = value;
    this.onChange(value);
    this.onTouch(value);
  }

  @Input() options: DropdownOption[];
  @Input() defaultValue: string | number;
  label: string;
  isShow: boolean;
  hoveredValue: string | number;

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isShow = false;
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      let index = this.options.findIndex(o => o.value === this.hoveredValue);
      index = --index >= 0 ? index-- : this.options.length - 1
      this.hoveredValue = this.options[index].value;
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      let index = this.options.findIndex(o => o.value === this.hoveredValue);
      index++
      this.hoveredValue = this.options[index % this.options.length].value
    }

    if (event.keyCode === KEY_CODE.ENTER) {
      let index = this.options.findIndex(o => o.value === this.hoveredValue)
      this.select(this.options[index])
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.defaultValue !== "") {
      let defaultOption = this.options.find(o => o.value === this.defaultValue);
      this.label = defaultOption.label;
      this.hoveredValue = defaultOption.value;
    }
    this.isShow = false;
  }

  writeValue(value: string | number): void {
    this.currentValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setLabel() {
    this.label = this.options.find(o => o.value === this._currentValue).label;
  }

  show() {
    this.isShow = !this.isShow;
  }

  select(option: DropdownOption) {
    this.currentValue = option.value;
    this.setLabel();
    this.isShow = false;
  }

  hover(optionValue: string | number) {
    this.hoveredValue = optionValue;
  }
}
