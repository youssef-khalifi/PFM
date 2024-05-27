import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAddProductComponent } from './stock-add-product.component';

describe('StockAddProductComponent', () => {
  let component: StockAddProductComponent;
  let fixture: ComponentFixture<StockAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAddProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
