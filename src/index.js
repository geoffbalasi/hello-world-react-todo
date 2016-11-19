import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var AddItem = React.createClass({
    render: function(){
        return (
            <div className="search_container">
            	<h1> Today's Tasks </h1>
            	<input className="searchbox" type="text" placeholder="Enter Todo List Item" value={this.props.newItem.value} onChange={this.props.onChange} onKeyPress={this.props.keyPress} />
                <input className="button" type="submit" value="Add" onClick={this.props.onAdd} disabled={this.props.disabled} />
            </div>
        );
    }
});

var ItemList = React.createClass({
	render: function(){	
		var remove = this.props.removeItem;
		var edit = this.props.edit;
		var todos = this.props.items.map(function(item, index){
            return <div key={index} className="item">
            			<Item item={item} edit={edit} />
            			<div className="delete" onClick={remove} id={index}> x </div>
            			<div className="clear"> </div>
            		</div>
        });  
		return (
			<div className="container"> {todos} </div>
		);
	}
});

var Item = React.createClass({
	render: function(){
		if (!this.props.item.editable) {
			return <div> {this.props.item.value} </div>
		}
		else {
			return <input type="text" defaultValue={this.props.item.value} onChange={this.props.edit} />
		}
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
    	var newItem = this.state.newItem;
        this.setState(function(state){
        	items: state.items.push(newItem)
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
    editItem: function(event){
    	var id = event.target.id;
    	var value = event.target.value;
    	// replace item value with input value
    	var items = this.state.items;
    	items[id] = value;
    	this.setState({
    		items: items
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
                <ItemList items={this.state.items} removeItem={this.removeItem} edit={this.editItem} />
            </div>
        );
    }
});

ReactDOM.render(<App />,  document.getElementById("root"));
