import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyRu]',
  host: {
    '(input)': 'replaceChar($event.target.value)'
  }
})

export class OnlyRuDirective {
  constructor(
    private element: ElementRef, private renderer: Renderer2
  ) { }

  replaceChar(value: string) {
    this.renderer.setProperty(this.element.nativeElement, 'value', value.replace(/[^А-Яа-яЁё]/gi, '').replace(/\s+/gi, ', ')
    );
  }
}
