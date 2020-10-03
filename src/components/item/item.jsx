import React from 'react';
import PropTypes from "prop-types";
import "./item.css";
import {showElement, hideElement, showLine, hideLine} from "../../constants/constants";

export default class Item extends React.Component {

    static propType = {
        item: PropTypes.object.isRequired,
        deleteItem: PropTypes.func.isRequired,
        updateNumber: PropTypes.func.isRequired,
        updateValue: PropTypes.func.isRequired,
        updateDone: PropTypes.func.isRequired,
    }

    state = {
        displayValue: showElement,
        displayEdit: hideElement,
        inputText: "",
    }

    handleDeleteClick = () => {
        const {item, deleteItem} = this.props;
        deleteItem(item.index);
    }

    handleInputNumberChange = (event) => {
        const inputText = parseInt(event.target.value);
        if(isNaN(inputText)) return;
        const {item, updateNumber} = this.props;
        updateNumber(item.index, inputText);
    }

    handValueClick = () => {
        const {item, updateDone} = this.props;
        updateDone(item.index);
    }

    handleEditClick = () => {
        let {displayValue, displayEdit} = this.state;
        displayValue = displayValue === showElement ? hideElement : showElement;
        displayEdit = displayEdit === hideElement ? showElement : hideElement;
        this.setState({
            displayValue: displayValue, 
            displayEdit: displayEdit,
        });
    }

    handleInputTextChange = (event) => {
        const inputText = event.target.value;
        this.setState({inputText});
    }

    handleSaveClick = () => {
        const {item, updateValue} = this.props;
        const {inputText} = this.state;
        if(inputText !== "") {
            updateValue(item.index, inputText);
        }
        this.handleEditClick();
        this.setState({
            inputText: "",
        });
    }
    
    render() {
        const {item} = this.props;
        const {displayValue, displayEdit, inputText} = this.state;
        const line = item.done ? showLine : hideLine;
        return (
        <li>
            <input type="number" value={item.number} onChange={this.handleInputNumberChange}/> 
            <div style={displayValue}>
                <span style={line} onClick={this.handValueClick}>{item.value}</span> 
                <button onClick={this.handleEditClick}>Edit</button>
            </div>
            <div style={displayEdit}>
                <input type="text" value={inputText} onChange={this.handleInputTextChange} />
                <button onClick={this.handleSaveClick}>Save</button>
                <button onClick={this.handleEditClick}>Cancel</button>
            </div>
            <button onClick={this.handleDeleteClick}>Delete</button>
        </li>
        )
    };
}
