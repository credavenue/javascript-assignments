import { TodoComponent } from "./todo.component";
import {FormsModule} from '@angular/forms';
import { async,ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('TodoComponent',()=>{
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations:[TodoComponent]
    }).compileComponents();
  }));

  beforeEach(async(()=>{
  fixture = TestBed.createComponent(TodoComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  debugElement = fixture.debugElement.query(By.css('h2'));
  htmlElement = debugElement.nativeElement;
  }));

  it('it should show TODO title', ()=>{
    expect(htmlElement.textContent).toContain("TODO");
  })

  it('it should allow adding new task and verify that this new task is added in the list',()=>{
    component.addItem("My Karma Test Item for addition");
    debugElement = fixture.debugElement.query(By.css('label'));
    htmlElement = debugElement.nativeElement;
    fixture.detectChanges();
    expect(component.toDoItems).toBe(htmlElement.outerText);
  })


});