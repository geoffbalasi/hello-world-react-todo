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
            newItem: { value: '' , editable: false },
            disabled: true
        }
    },
    onAdd: function(){
    	var newItem = update(this.state.newItem, {editable:{$set: true}});
    	newItem.editable = false;
    	var newItems = this.state.items.push(newItem);
        this.setState(function(state){
        	items: newItems
        });
        this.resetInput();
        this.state.disabled = true;
    },
    _handleKeyPress: function(e) {
    	if (e.key === 'Enter' && !this.state.disabled) {
    		this.onAdd();
    	}
	},
    resetInput: function(){
    	var newItem = this.state.newItem;
    	newItem.value = '';
    	this.setState({ 
    		newItem: newItem
    	})
    },
    removeItem: function(event){
    	var id = event.target.id;
    	this.setState(function(state){
    		items: state.items.splice(id,1);
    	});
    },
    onChange: function(event) {
    	this.disabled(event.target.value);
    	var value = event.target.value;
    	var newItem = this.state.newItem;
    	newItem.value = value;
		this.setState({
    		newItem: newItem
    	})
    },
    updateItem: function(event) {
    	var id = event.target.id;
    	var value = event.target.value;
    	var items = this.state.items;
		items[id].value = value;
    	this.setState({
    		items: items
    	});
    },
    disabled: function(text) {
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
