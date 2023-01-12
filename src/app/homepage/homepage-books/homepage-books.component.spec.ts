import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomepageBooksComponent } from "./homepage-books.component";

describe("HomepageBooksComponent", () => {
  let component: HomepageBooksComponent;
  let fixture: ComponentFixture<HomepageBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageBooksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
