import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollFromBottom: BehaviorSubject<number>;

  constructor() {
    this.scrollFromBottom = new BehaviorSubject<number>(1000);
  }

  setValue(newValue: number): void {
    this.scrollFromBottom.next(newValue);
  }

  getValue(): Observable<number> {
    return this.scrollFromBottom.asObservable();
  }
}
