import React from 'react';
require('./ComponentStyle.css')


export default class TitleSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="titleSection">
              <div className="titleName">{this.props.title}</div>
              <div className="titleUnderline" />
          </div>
        )
    }
}