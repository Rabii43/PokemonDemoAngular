import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonComponent } from './add-pokemon.component';

describe('AddPokemonComponent', () => {
  let component: AddPokemonComponent;
  let fixture: ComponentFixture<AddPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
