import { Component, AfterContentInit, QueryList, ContentChildren, Output, EventEmitter } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @Output() activeTab = new EventEmitter<string>();
  constructor() { }

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabComponent){
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    tab.active = true;
    this.activeTab.emit(tab.title)
  }

}
