import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPokemonComponent } from './search-pokemon.component';

describe('SearchPokemonComponent', () => {
  let component: SearchPokemonComponent;
  let fixture: ComponentFixture<SearchPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
