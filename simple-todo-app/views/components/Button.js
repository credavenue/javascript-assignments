import React from 'react';
require('./ComponentStyle.css')


export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="button" onClick={this.props.clickFn}>{this.props.type}</div>
        )
    }
}