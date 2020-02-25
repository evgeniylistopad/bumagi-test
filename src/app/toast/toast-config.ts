import { InjectionToken } from '@angular/core';

export class ToastData {
  text?: string;
}

export interface ToastConfig {
    position?: {
        top: number;
        right: number;
    };
}

export const defaultToastConfig: ToastConfig = {
    position: {
        top: 20,
        right: 20,
    }
};
