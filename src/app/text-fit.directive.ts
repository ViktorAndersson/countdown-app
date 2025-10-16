import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appTextFit]',
  standalone: true,
})
export class TextFitDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() appTextFit = '';
  private observer?: ResizeObserver;
  private resizeHandler = () => this.fitText();

  constructor(private textElement: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.fitText();
    this.observeResize();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appTextFit']) {
      queueMicrotask(() => this.fitText());
    }
  }
  onResize() {
    this.fitText();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    window.removeEventListener('resize', this.resizeHandler);
  }

  private observeResize() {
    this.observer = new ResizeObserver(() => this.fitText());
    this.observer.observe(this.textElement.nativeElement);
  }

  private fitText() {
    const textElement = this.textElement.nativeElement;
    const parentWidth = textElement.parentElement?.clientWidth ?? window.innerWidth;

    textElement.style.whiteSpace = 'nowrap';
    textElement.style.display = 'inline-block';

    let min = 8;
    let max = 500;
    let best = min;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      textElement.style.fontSize = `${mid}px`;

      const isTooWide = textElement.scrollWidth > parentWidth;
      if (isTooWide) {
        max = mid - 1;
      } else {
        best = mid;
        min = mid + 1;
      }
    }

    textElement.style.fontSize = `${best}px`;
  }
}
