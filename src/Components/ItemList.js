import React, {Component} from 'react';
import Item from './Item';

export default class ItemList extends Component {
	render() {	
		var remove = this.props.removeItem;
		var edit = this.props.edit;
		var update = this.props.update;
		var todos = this.props.items.map(function(item, index){
            return <div key={index} className="item">
            			<Item item={item} edit={edit} id={index} update={update} />
            			<div className="delete" onClick={remove} id={index}> x </div>
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
}