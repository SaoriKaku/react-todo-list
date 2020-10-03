import React from 'react';
import ItemFilter from "../item-filter/item-filter"
import {showElement, hideElement} from "../../constants/constants";
import "./item-edit.css";

export default class ItemEdit extends React.Component {

    state = {
        todoList: [],
        inputText: "",
    }

    handleInputChange = (event) => {
        const inputText = event.target.value;
        this.setState({inputText});
    }

    handleEnterKey = (event) => {
        const {inputText} = this.state;
        if(inputText !== "" && event.keyCode === 13) {
            this.addItem();
        }
    }

    addItem = () => {
        const {inputText} = this.state;
        let {todoList} = this.state;
        const item = {number: 1, value: inputText, done: false, index: todoList.length};
        todoList.push(item);
        this.setState({
            todoList: todoList,
            inputText: "", 
        });
    }

    deleteItem = (index) => {
        const {todoList} = this.state;
        todoList.splice(index, 1);
        // update index from index
        for(let i = index; i < todoList.length; i++) {
            todoList[i] = {...todoList[i], index: i};
        }
        this.setState({todoList});
    }

    updateNumber = (index, number) => {
        let {todoList} = this.state;
        todoList[index].number = number;
        todoList.sort(this.sortItem);
        // update index
        for(let i = 0; i < todoList.length; i++) {
            todoList[i] = {...todoList[i], index: i};
        }
        this.setState({todoList});
    }

    sortItem = (a, b) => {
        return a.number - b.number;
    }

    updateValue = (index, value) => {
        let {todoList} = this.state;
        todoList[index].value = value;
        this.setState({todoList});
    }

    updateDone = (index) => {
        let {todoList} = this.state;
        const flag = todoList[index].done;
        todoList[index].done = !flag;
        this.setState({todoList});
    }

    render() {
        const {todoList, inputText} = this.state;
        const displayNoResult = todoList.length === 0 ? showElement : hideElement;
        const displayItemFilter = todoList.length === 0 ? hideElement : showElement;
        return (
            <div className="wrapper">
                <p style={displayNoResult}>No result.</p>
                <div style={displayItemFilter}>
                    <ItemFilter todoList={todoList} deleteItem={this.deleteItem} updateNumber={this.updateNumber} updateValue={this.updateValue} updateDone={this.updateDone} /> 
                </div>
                <input type="text" placeholder="add item to todo list" value={inputText} onChange={this.handleInputChange} onKeyUp={this.handleEnterKey}/>
            </div>
        )
    };
}
