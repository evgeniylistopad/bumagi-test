import { Component, OnInit } from '@angular/core';
import { ToastData } from '../toast-config';
import { ToastRef } from '../toast-ref';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(readonly data: ToastData, readonly ref: ToastRef) { }

  ngOnInit(): void {
    setTimeout(() => this.close(), 5000);
  }

  close() {
    this.ref.close();
  }

}
