import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import ItemList from './Components/ItemList';
import AddItem from './Components/AddItem';
import './index.css';

var App = React.createClass({
    getInitialState: function(){
        return {
            items: [],
            newItem: { value: '' },
            disabled: true
        }
    },
    onAdd: function(){
    	// what is a better way to go about this??
    	var newItem = update(this.state.newItem, {value:{$set: ''}});
    	newItem.value = this.state.newItem.value;

    	var Items = this.state.items;
    	Items.push(newItem);
        this.setState({
        	items: Items,
        	disabled: true
        });
        this.resetInput();
    },
    _handleKeyPress: function(e) {
    	//Attempt to add when Enter key is pressed
    	if (e.key === 'Enter' && !this.state.disabled) {
    		this.onAdd();
    	}
	},
    resetInput: function(){
    	//After adding value, clear out input
    	var newItem = this.state.newItem;
    	newItem.value = '';
    	this.setState({ 
    		newItem: newItem
    	})
    },
    removeItem: function(event){
    	//Deleting a todo
    	var id = event.target.id;
    	var items = this.state.items;
    	items.splice(id,1);
    	this.setState({
    		items: items
    	});
    },
    onChange: function(event) {
    	//Update the state when an input occurs
    	this.disabled(event.target.value);
    	var value = event.target.value;
    	var newItem = this.state.newItem;
    	newItem.value = value;
		this.setState({
    		newItem: newItem
    	})
    },
    updateItem: function(event) {
    	//Update the state when text is changed
    	var id = event.target.id;
    	var value = event.target.value;
    	var items = this.state.items;
		items[id].value = value;
    	this.setState({
    		items: items
    	});
    },
    disabled: function(text) {
    	//Disable input when there is no text entered
    	if ( text === '' ) {
    		this.setState({
	    		disabled : true
	    	})
    	}
    	else {
    		this.setState({
	    		disabled : false
	    	})
    	}
    },
    render: function(){
        return (
            <div>
                <AddItem onAdd={this.onAdd} onChange={this.onChange} newItem={this.state.newItem} keyPress={this._handleKeyPress} disabled={this.state.disabled}/>
                <ItemList items={this.state.items} removeItem={this.removeItem} edit={this.editItem} update={this.updateItem} />
            </div>
        );
    }
});

ReactDOM.render(<App />,  document.getElementById("root"));
