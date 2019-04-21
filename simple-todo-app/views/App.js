import React from 'react';
import ReactDOM from "react-dom";
import TitleSection from "./components/TitleSection";
import AddBox from "./components/AddBox";
import TodoBox from "./components/TodoBox";
import TodoList from "./components/TodoList"

require('./App.css')
const uuidv4 = require('uuid/v4');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._addItem = this._addItem.bind(this);
        this._editItem = this._editItem.bind(this);
        this._deleteItem = this._deleteItem.bind(this);
        this.state = {
          items : [], 
          value:''
        };
    }

    _addItem(item) {
      let itemToAdd = {
        name: item, 
        state:"todo",
        id: uuidv4()
      }
      this.setState({
        items : [...this.state.items, itemToAdd]
      })
    }    

    _editItem(editedItem) {
      let todoItems = this.state.items;
      let editedIndex = todoItems.findIndex(anItem => 
        anItem.id == editedItem.id
      );
      todoItems[editedIndex] = editedItem
      this.setState({
        items : todoItems
      })
    }

    _deleteItem(deletedId) {
      let todoItems = this.state.items;
      let deletedIndex = todoItems.findIndex(anItem => 
        anItem.id == deletedId
      );
      todoItems.splice(deletedIndex, 1);
      this.setState({
        items : todoItems
      })
    }

    render() {
      let totalItems=this.state.items, todoItems = [], completedItems = [];
      for(var i in totalItems) {
        if(totalItems[i].state == "todo") {
          todoItems = [...todoItems, totalItems[i]];
        } else {
          completedItems = [...completedItems, totalItems[i]]
        }
      }
        return (
          <div className="app">
            <div className="heading">TODO LIST</div>
            <TitleSection title="ADD ITEM" />
            <AddBox type="add_box" onAdd={this._addItem}/>
            <TodoList title="TODO" items={todoItems} itemType="todo" onEdit={this._editItem} onDelete={this._deleteItem}/>
            <TodoList title="COMPLETED" items={completedItems} itemType="completed" onEdit={this._editItem} onDelete={this._deleteItem}/>
          </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("container"));