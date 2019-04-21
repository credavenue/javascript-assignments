import React from 'react';
import ReactDOM from "react-dom";
import Table from "./components/table";
import InputBox from "./components/inputBox";
import "./App.css";

export class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let displayState;
        if(this.props.pageNumber == 1) {
            displayState = "firstSet"; 
        } else if(this.props.pageNumber == this.props.totalPageCount) {
            displayState = "lastSet";
        }
        return (
            <div className="pagination">
                <div className={`pagination-links previous ${displayState}`} onClick={() => this.props.handlePagination("previous")}>Previous</div>
                &nbsp;&nbsp;{this.props.pageNumber} of {this.props.totalPageCount}&nbsp;&nbsp;
                <div className={`pagination-links next ${displayState}`} onClick={() => this.props.handlePagination("next")}>Next</div>
            </div>
        )
    }
}

export default class GoodReadsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayState: "searchInput",
            data: {},
            pageNumber: 1,
            errorText: ""
        }
        this._onSubmitAuthorName = this._onSubmitAuthorName.bind(this);
        this._fetchDetails = this._fetchDetails.bind(this);
        this._handlePagination = this._handlePagination.bind(this);
        this._performNewSearch = this._performNewSearch.bind(this);
    }

    _onSubmitAuthorName(authorName) {
        this._encodedName = encodeURI(authorName);
        let page = this.state.pageNumber;
        this._fetchDetails(this._encodedName, page);
        this.setState({displayState: "loading"});
    }    

    _fetchDetails(authorName, page) {
        fetch('/getResponse/?name='+authorName+'&page='+page)
        .then(response => response.json())
        .then((responseJson) => {
            let results = responseJson.GoodreadsResponse.search.results.work;
            let totalResults = responseJson.GoodreadsResponse.search["total-results"];
            this._totalPageCount = Math.floor(totalResults/20) + (totalResults%20==0?0:1);
            this.setState({data: results, displayState: "resultsTable"});
        }).catch((err) => {
                console.log(err);
                this.setState({data: {}, displayState: "searchInput", errorText:"Couldn't fetch data"});
        });
    }

    _handlePagination(action) {
        let newPageNumber;
        switch(action) {
            case "previous":
                newPageNumber = this.state.pageNumber -1;
                this.setState({pageNumber: newPageNumber, displayState: "loading"});
                break;
            case "next":
                newPageNumber = this.state.pageNumber +1;
                break;
            default:
                break;
        }
        this.setState({pageNumber: newPageNumber, displayState: "loading"});
        this._fetchDetails(this._encodedName, newPageNumber);
    }

    _performNewSearch() {
        this.setState({displayState: "searchInput", pageNumber: 1, data: {}});
    }
    
    render() {
        window.scrollTo(0, 0)
        let display, text;
        switch(this.state.displayState) {
            case "searchInput":
                text = this.state.errorText + "\nSearch Books with Name";
                display = <InputBox placeholder="Book name here" onClick={this._onSubmitAuthorName} />;
                break;
            case "loading":
                text = "Loading Results...";
                display = null;
                break;
            case "resultsTable":
                text = "Search Results";
                display = <div>
                    <button className="new-search-button" onClick={this._performNewSearch}>New Search</button>
                    <Pagination handlePagination={this._handlePagination} pageNumber={this.state.pageNumber} totalPageCount={this._totalPageCount}/>
                    <Table data={this.state.data}/>
                    <Pagination handlePagination={this._handlePagination} pageNumber={this.state.pageNumber} totalPageCount={this._totalPageCount}/>
                </div>
                break;
            default:
                break;
        }
        return(
            <div className="main-container">
                <div className="logo"></div>
                <div className="heading">{text}</div>
                {display}
            </div>
        )
    }
}

ReactDOM.render(<GoodReadsApp />, document.getElementById("container"));
