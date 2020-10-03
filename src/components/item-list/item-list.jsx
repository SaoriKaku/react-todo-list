import React from 'react';
import PropTypes from "prop-types";
import Item from "../item/item";
import "./item-list.css";

export default class ItemList extends React.Component {
    
    static propTypes = {
        itemList: PropTypes.array.isRequired,
        deleteItem: PropTypes.func.isRequired,
        updateNumber: PropTypes.func.isRequired,
        updateValue: PropTypes.func.isRequired,
        updateDone: PropTypes.func.isRequired,
    }

    render() {
        const {itemList, deleteItem, updateNumber, updateValue, updateDone} = this.props;
        return (
        <ul>
            {itemList.map((item, index) => <Item key={index} item={item} deleteItem={deleteItem} updateNumber={updateNumber} updateValue={updateValue} updateDone={updateDone} />)}
        </ul>
        )
    };
}
