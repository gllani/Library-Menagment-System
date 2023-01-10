import {Directive,ElementRef,Input} from '@angular/core';

@Directive({
  selector:"[bold]",
  host:{
    '(mouseenter)':'onMouseEnterFun()',
    '(mouseleave)':'onMouseLeaveFun()'
  }
})
export class MyDirective {
element:HTMLElement;

@Input()
bold!:string;

constructor(public eleRef:ElementRef){
  this.element = eleRef.nativeElement;
}
onMouseEnterFun() {
  this.element.style.backgroundColor="Yellow";
  this.element.style.fontWeight="bold";
}
onMouseLeaveFun() {
  this.element.style.backgroundColor="White";
  this.element.style.fontWeight="normal";
}

}