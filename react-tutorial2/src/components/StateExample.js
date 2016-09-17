import React from 'react';

class StateExample extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			header: 'Header Initial State',
			content: 'Content Initial State',
		};

		this._updateHeader = this._updateHeader.bind(this)
	}	

	_updateHeader(text){
		this.setState({
			header: 'Header has changed'	
		});	
	}

	render() {
		return (
			<div>
				<hr/>
				<h1>{this.state.header}</h1>
				<h2>{this.state.content}</h2>
				<button onClick={this._updateHeader}>Update</button>
			</div>
		);	
	}
}

export default StateExample;
