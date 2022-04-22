import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIssuerComponent } from './customer-issuer.component';

describe('CustomerIssuerComponent', () => {
  let component: CustomerIssuerComponent;
  let fixture: ComponentFixture<CustomerIssuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerIssuerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIssuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
