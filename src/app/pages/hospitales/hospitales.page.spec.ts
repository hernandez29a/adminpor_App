import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitalesPage } from './hospitales.page';

describe('HospitalesPage', () => {
  let component: HospitalesPage;
  let fixture: ComponentFixture<HospitalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
