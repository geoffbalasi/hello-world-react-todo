import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import './index.css';



var AddItem = React.createClass({
    render: function(){
        return (
            <div className="search_container">
            	<h1> Today's Tasks </h1>
            	<input ref="editItem" className="searchbox" type="text" placeholder="Enter Todo List Item" value={this.props.newItem.value} onChange={this.props.onChange} onKeyPress={this.props.keyPress} />
                <input className="button" type="submit" value="Add" onClick={this.props.onAdd} disabled={this.props.disabled} />
            </div>
        );
    }
});

var ItemList = React.createClass({
	render: function(){	
		var remove = this.props.removeItem;
		var edit = this.props.edit;
		var update = this.props.update;
		var todos = this.props.items.map(function(item, index){
            return <div key={index} className="item">
            			<Item item={item} edit={edit} id={index} update={update} />
            			<div className="delete" onClick={remove} id={index}> x </div>
            			<div className="clear"> </div>
            		</div>
        });  
        if (this.props.items.length > 0) {
        	return (
				<div className="container"> {todos} </div>
			);
        }
        else {
        	return (
        		<div className="empty"> Nothing here yet </div>
        	);
        	
        }
		
	}
});

var Item = React.createClass({
	render: function(){
		return <input type="text" value={this.props.item.value} onChange={this.props.update} id={this.props.id}/>
	}
});

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
    	if (e.key === 'Enter') {
    		this.disabled(this.state.newItem);
    		if (!this.state.disabled) {
    			this.onAdd();
    		}
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
    	if ( text.value === '' ) {
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
