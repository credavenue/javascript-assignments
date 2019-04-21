import React from 'react';
require('./ComponentStyle.css')
import Button from "./Button"

export default class AddBox extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onAdd = this._onAdd.bind(this);
        this.state = {value: props.value || ''}
    }

    _onAdd() {
        this.setState({value: ""});
        this.props.onAdd(this.state.value);
    }

    _onChange(e) {
        this.setState({value:e.target.value});
    }

    render() {
        let buttons = this.props.buttons;
        return (
          <div className="input_box">
              <input type="text" value={this.state.value} className={this.props.type} placeholder="Text here" onChange={this._onChange} />
              <Button type="Add" clickFn={this._onAdd}/>
          </div>
        )
    }
}