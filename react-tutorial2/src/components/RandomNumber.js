import React from 'react';

class RandomNumber extends React.Component{
	_update(){
		let value = Math.round(Math.random() * 100);	
		this.props.onUpdate(value); // 부모에서 전달해준 함수임
	}

	constructor(props){
		super(props);
		this._update = this._update.bind(this);
	}

	render(){
		return (
			<div>
				<h1>Random NUMBER: {this.props.number}</h1>
				<button onClick={this._update}>Randomize</button>
			</div>
		);	
	}
}


export default RandomNumber;
