import React from 'react';
import PropTypes from "prop-types";
import ItemList from "../item-list/item-list";
import "./item-filter.css";

export default class ItemFilter extends React.Component {

    static propTypes = {
        todoList: PropTypes.array.isRequired,
        deleteItem: PropTypes.func.isRequired,
        updateNumber: PropTypes.func.isRequired,
        updateValue: PropTypes.func.isRequired,
        updateDone: PropTypes.func.isRequired,
    }

    state = {
        itemList: this.props.todoList,
        inputText: "",
    }

    handleInputChange = (event) => {
        const inputText = event.target.value;
        const {todoList} = this.props;
        if(inputText === "") {
            this.setState({
                inputText,
                itemList: todoList,
            });
            return;
        }
        let itemList = [];
        for(const item of todoList) {
            if(item.value === inputText) {
                itemList.push(item);
            }
        }
        this.setState({
            inputText,
            itemList,
        });
    }

    handleAllClick = () => {
        //console.log("test");
        const {todoList} = this.props;
        this.setState({
            itemList: todoList,
        });
    }

    handleProcessClick = () => {
        const {todoList} = this.props;
        let itemList = [];
        for(const item of todoList) {
            if(!item.done) {
                itemList.push(item);
            }
        }
        this.setState({itemList});
    }

    handleDoneClick = () => {
        const {todoList} = this.props;
        let itemList = [];
        for(const item of todoList) {
            if(item.done) {
                itemList.push(item);
            }
        }
        this.setState({itemList});
    }

    render() {
        const {itemList, inputText} = this.state;
        const {deleteItem, updateNumber, updateValue, updateDone} = this.props;
        return (
        <div>
            <input type="text" placeholder="search the todo list" value={inputText} onChange={this.handleInputChange} />
            <h4 className="title">Todo List</h4>
            <ItemList itemList={itemList} deleteItem={deleteItem} updateNumber={updateNumber} updateValue={updateValue} updateDone={updateDone} />
            <div className="filter">
                <span className="tab" onClick={this.handleAllClick}>All</span> &nbsp;
                <span className="tab" onClick={this.handleProcessClick}>Processing</span> &nbsp;
                <span className="tab" onClick={this.handleDoneClick}>Done</span>
            </div>
        </div>
        )
    };
}
