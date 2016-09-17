import React from 'react';

class App extends React.Component{
	_sayHey(){
		alert('Hey');
	}

	render(){
		let text = 'Dev-server';
		let pStyle = {
			color: 'aqua',
			backgroundColor: 'black'
		}

		return (
			<div>
				<h1>Hello React Skeleton</h1>	
				<h2>Welcome to {text} </h2>
				<button onClick={this._sayHey}>Click Me</button>
				<p style={pStyle}> {1 == 1? 'True': 'False'}</p>
			</div>
		);	
	}
}

export default App;
