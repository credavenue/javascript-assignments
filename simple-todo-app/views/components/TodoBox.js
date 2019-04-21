import React from 'react';
require('./ComponentStyle.css')
import Button from "./Button"

export default class TodoBox extends React.Component {
    constructor(props) {
        super(props);
        this._clickFn = this._clickFn.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onEditOrSave = this._onEditOrSave.bind(this);
        this._onCheckBoxClick = this._onCheckBoxClick.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this.state = {
            value: props.value || '',
            buttonState: "Edit",
            checkboxState: false,
            textBoxReadOnly: true
        }
    }

    _clickFn() {
        this.props.onAdd(this.state.value)
    }

    _onChange(e) {
        this.setState({value:e.target.value});
    }

    _onEditOrSave() {
        if(this.state.buttonState == "Edit") {
            this.setState({
                buttonState: "Save",
                textBoxReadOnly: false
            });
            return;
        } else {
            let newItem = {
                name: this.state.value,
                state: this.state.checkboxState ? "completed" : "todo",
                id: this.props.id
            }
            this.setState({buttonState: "Edit"});
            this.props.onEdit(newItem);
        }
    }

    _onDelete() {
        this.props.onDelete(this.props.id)
    }

    _onCheckBoxClick() {
        this.setState({checkboxState: !this.state.checkboxState})
    }

    render() {
        let buttons = this.props.buttons;
        let classToAdd = this.props.type + (this.state.buttonState=="Edit" ? " transparent_box" : "" );
        return (
          <div className="todo_boxes">
            <input type="checkbox" onClick={this._onCheckBoxClick}/>
              <input type="text" value={this.state.value} className={classToAdd} placeholder="Text here" readOnly={this.state.textBoxReadOnly} onChange={this._onChange} />
              <Button type={this.state.buttonState} clickFn={this._onEditOrSave}/>
              <Button type={"Delete"} clickFn={this._onDelete}/>
          </div>
        )
    }
}