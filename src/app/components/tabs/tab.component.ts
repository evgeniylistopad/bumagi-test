import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.scss"]
})
export class TabComponent implements OnInit {
  @Input('tabTitle') title: string;
  @Input() active = false;

  constructor() {}

  ngOnInit() {}
}
