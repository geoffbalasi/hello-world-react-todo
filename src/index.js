import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var AddItem = React.createClass({
    render: function(){
        return (
            <div>
            	<input type="text" placeholder="Enter Todo List Item" value={this.props.newItem} onChange={this.props.onChange} />
                <input type="submit" value="Add" onClick={this.props.onAdd} />
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
            			<div onClick={remove} id={index}> x </div>
            		</div>
        });  
		return (
			<div> {todos} </div>
		);
	}
});

var App = React.createClass({
    getInitialState: function(){
        return {
            items: [],
            newItem: ''
        }
    },
    onAdd: function(){
        this.setState(function(state){
        	items: state.items.push(state.newItem)
        });
        this.resetInput();
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
    	this.setState({
    		newItem : event.target.value
    	})
    },
    render: function(){
        return (
            <div>
                <h1> Todo List </h1>
                <AddItem onAdd={this.onAdd} onChange={this.onChange} newItem={this.state.newItem} />
                <ItemList items={this.state.items} removeItem={this.removeItem} />
            </div>
        );
    }
});

ReactDOM.render(<App />,  document.getElementById("root"));
