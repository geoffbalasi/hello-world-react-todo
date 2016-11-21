import React, {Component} from 'react';

export default class AddItem extends Component {
    render() {
        return (
            <div className="search_container">
                <h1> Today's Tasks </h1>
                <input ref="editItem" className="searchbox" type="text" placeholder="Enter Todo List Item" value={this.props.newItem.value} onChange={this.props.onChange} onKeyPress={this.props.keyPress} />
                <input className="button" type="submit" value="Add" onClick={this.props.onAdd} disabled={this.props.disabled} />
            </div>
        );
    }
}