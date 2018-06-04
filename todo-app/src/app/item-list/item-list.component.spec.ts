import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import { Item } from '../model/item';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListComponent ]
    })
    .overrideComponent(ItemListComponent, {
      set: { template: '<div></div>'}
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change edit value when editItem() is called', () => {
    const item =  new Item();
    item.name = 'Test101';
    component.incompleteItems = [item];
    expect(component.incompleteItems[0].edit).toBeFalsy();
    component.editItem(0, 'inc');
    expect(component.incompleteItems[0].edit).toBeTruthy();
    component.incompleteItems = [];
    const completedItem = new Item();
    item.completed = true;
    expect(completedItem.edit).toBeFalsy();
    component.completedItems = [completedItem];
    component.editItem(0, 'com');
    expect(component.completedItems[0].edit).toBeTruthy();
  });

  it('should complete a item and add to complete list on call of completeItem()', () => {
    const item = new Item();
    item.name = 'Test101';
    component.incompleteItems = [item];
    expect(component.incompleteItems.length).toBe(1);
    expect(component.completedItems.length).toBe(0);
    component.completeItem(0);
    expect(component.incompleteItems.length).toBe(0);
    expect(component.completedItems.length).toBe(1);
  });

  it('should delete an item', () => {
    const item =  new Item();
    item.name = 'Test101';
    component.incompleteItems = [item];
    expect(component.incompleteItems.length).toBe(1);
    component.deleteItem(0, 'inc');
    expect(component.incompleteItems.length).toBe(0);

    const completedItem =  new Item();
    completedItem.name = 'Test102';
    component.completedItems = [completedItem];
    expect(component.completedItems.length).toBe(1);
    component.deleteItem(0, 'com');
    expect(component.completedItems.length).toBe(0);
  });

  it('should assign items to incomplete', () => {
    expect(component.incompleteItems).toBeUndefined();
    component.ngOnChanges();
    expect(component.incompleteItems).toBeDefined();
  })
});
