import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-range-slider',
  templateUrl: './price-range-slider.component.html',
  styleUrls: ['./price-range-slider.component.css'],
})
export class PriceRangeSliderComponent {
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 100;
  @Output() priceRangeChange = new EventEmitter<[number, number]>();

  temporaryPriceRange: [number, number] = [this.minPrice, this.maxPrice];

  onPriceChange(event: any, type: 'min' | 'max') {
    if (type === 'min') {
      this.temporaryPriceRange[0] = event.target.value;
    } else {
      this.temporaryPriceRange[1] = event.target.value;
    }
    this.priceRangeChange.emit(this.temporaryPriceRange);
  }
}
