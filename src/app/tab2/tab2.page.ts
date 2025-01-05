import { Component, ElementRef, HostListener, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { fromEvent, Subscription } from 'rxjs';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor() {
    this.entryLiquid = Number(localStorage.getItem("entryLiquid"));
    this.exitLiquid = Number(localStorage.getItem("exitLiquid"));
  }
  public buttonClickSubscription: Subscription | null = null;
  public entryLiquid: number = 0;
  public exitLiquid: number = 0;
  public inputValue1: number = 0;
  public inputValue2: number = 0;

  bar1Value: number = Number(localStorage.getItem("entryLiquid")); // İlk cetvel barın doluluk değeri
  bar2Value: number = Number(localStorage.getItem("exitLiquid")); // İkinci cetvel barın doluluk değeri

  scaleNumbers = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 0]; // Cetveldeki eşiklers

  get bar1Fill(): number {
    return this.bar1Value > 1000 ? 1000 : this.bar1Value; 
  }

  get bar2Fill(): number {
    return this.bar2Value > 1000 ? 1000 : this.bar2Value;
  }

  ngOnInit() {
  this.buttonClickSubscription = fromEvent(document, 'click')
    .subscribe((event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'ION-BUTTON' || target.tagName === 'BUTTON') {
        window.location.reload();
      }
    });
  } 

  cleanLiquid(){
    localStorage.setItem("entryLiquid","0")
    localStorage.setItem("exitLiquid","0")
    window.location.reload()
  }

  addLiquid(amount: number){
    this.entryLiquid += amount;
    localStorage.setItem("entryLiquid",this.entryLiquid.toString())
    this.inputValue1 = 0;
    this.inputValue2 = 0;
  }
  removeLiquid(amount: number){
    this.exitLiquid += amount;
    localStorage.setItem("exitLiquid",this.exitLiquid.toString())
    this.inputValue1 = 0;
    this.inputValue2 = 0;
  }
}
