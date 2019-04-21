import React from 'react';
require('./ComponentStyle.css')
import TodoBox from "./TodoBox"
import CompletedBox from "./CompletedBox"
import TitleSection from "./TitleSection";

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItems() {
        if(this.props.itemType == "todo") {
            return this.props.items.map((item) => <TodoBox key={item.id} id={item.id} type="todo_box"
            value={item.name} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>)
        } else {
            return this.props.items.map((item) => <CompletedBox key={item.id} id={item.id} type="completed_box"
            value={item.name} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>)
        }
    }

    render() {
        let titleSection = (this.props.items.length !== 0 ? <TitleSection title={this.props.title} /> : null);
        return (
          <div className="todo-list">
              {titleSection}
              {this.renderItems()}
          </div>
        )
    }
}