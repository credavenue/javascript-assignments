import React from 'react';
import "./componentStyles.css";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
            return (
                <table className="table-container">
                    <tbody className="table-body">
                    {this.props.data.map(function(item, key) {
                        return <tr className="table-row" key = {key}>
                            <td className="table-item">{item.best_book.id._}</td>
                            <td className="table-item book-title">{item.best_book.title}</td>
                            <td className="table-item">{item.best_book.author.name}</td>
                            <td className="table-item">{item.average_rating}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            )
            
    }
}