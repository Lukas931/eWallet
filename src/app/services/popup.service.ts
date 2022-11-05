import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  isPopUpVisible: boolean = false;
  popUpVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() { 
    this.popUpVisibilityChange.subscribe((value) => {
      this.isPopUpVisible = value;
    });
  }

  togglePopUpVisibility() {
    this.popUpVisibilityChange.next(!this.isPopUpVisible);
  }
}
  