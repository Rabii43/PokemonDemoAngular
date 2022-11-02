import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPkmnBorderCard]'
})
export class PkmnBorderCardDirective {

  constructor(private el: ElementRef) {
    this.setBorder('#f5f5f5');
    this.setHieght(200);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder('#1f7a73');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5')
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = 'solid 4px' + color;
  }

  private setHieght(hieght: number) {
    this.el.nativeElement.style.height = hieght + 'px';
  }
}
