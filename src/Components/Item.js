import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';

export default class Item extends Component {
	render() {
		return <input type="text" value={this.props.item.value} onChange={this.props.update} id={this.props.id}/>
	}
}