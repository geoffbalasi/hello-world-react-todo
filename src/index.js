import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var AddItem = React.createClass({
    render: function(){
        return (
            <div className="search_container">
            	<h1> Today's Tasks </h1>
            	<input className="searchbox" type="text" placeholder="Enter Todo List Item" value={this.props.newItem} onChange={this.props.onChange} onKeyPress={this.props.keyPress} />
                <input className="button" type="submit" value="Add" onClick={this.props.onAdd} disabled={this.props.disabled} />
            </div>
        );
    }
});

var ItemList = React.createClass({
	render: function(){	
		var remove = this.props.removeItem;
		var todos = this.props.items.map(function(item, index){
            return <div className="item">
            			<div key={index} > {item} </div>
            			<div className="delete" onClick={remove} id={index}> x </div>
            			<div className="clear"> </div>
            		</div>
        });  
		return (
			<div className="container"> {todos} </div>
		);
	}
});

var App = React.createClass({
    getInitialState: function(){
        return {
            items: [],
            newItem: '',
            disabled: true
        }
    },
    onAdd: function(){
        this.setState(function(state){
        	items: state.items.push(state.newItem)
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
    	this.setState({ newItem: '' })
    },
    removeItem: function(event){
    	var id = event.target.id;
    	this.setState(function(state){
    		items: state.items.splice(id,1);
    	});
    },
    onChange: function(event) {
    	this.disabled(event.target.value);
		this.setState({
    		newItem : event.target.value,
    	})
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
                <ItemList items={this.state.items} removeItem={this.removeItem} />
            </div>
        );
    }
});

ReactDOM.render(<App />,  document.getElementById("root"));
