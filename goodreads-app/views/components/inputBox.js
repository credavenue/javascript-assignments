import React from 'react';
import "./componentStyles.css";

export default class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ""
        };
        this._onChange = this._onChange.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onChange(e) {
        this.setState({value: e.target.value});
    }

    _onButtonClick() {
        this.props.onClick(this.state.value);
    }

    render() {
        return(
            <div>
                <input type="text" className="input-box" value={this.state.value} placeholder={this.props.placeholder} onChange={this._onChange}/>
                <button className="submit-button" onClick={this._onButtonClick}>Submit</button>
            </div>
        )
    }
}