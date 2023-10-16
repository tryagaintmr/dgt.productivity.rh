import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  isSearchPanelVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isInitialPainting: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public isInitialLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public toggleSearchPanel() {
    this.isSearchPanelVisible.next(!this.isSearchPanelVisible.value);
  }

  searchPanelIsOpen(): Observable<boolean> {
    return this.isSearchPanelVisible.asObservable();
  }

  public toggleisInitialPainting() {
    this.isInitialPainting.next(!this.isInitialPainting.value);
  }

  searchisInitialPainting(): Observable<boolean> {
    return this.isInitialPainting.asObservable();
  }

  public toggleisInitialLoading() {
    this.isInitialLoading.next(!this.isInitialLoading.value);
  }

  getIsInitialLoading(): Observable<boolean> {
    return this.isInitialLoading.asObservable();
  }

}
