import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';
import StateExample from './StateExample';

class App extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			value : Math.round(Math.random() * 100)
		};
		
		this._updateValue = this._updateValue.bind(this); 
	}

	_updateValue(randomValue){
		this.setState({
			value: randomValue	
		});	
	}

	render(){
			return (
				<div>
					<Header title={ this.props.headerTitle }/>
					<Content title={ this.props.contentTitle }
										body={ this.props.contentBody }/>
					<RandomNumber number={this.state.value}
												onUpdate={this._updateValue}/>
					<StateExample />
				</div>
			);
	}
}

App.defaultProps = {
	headerTitle: 'Default Header',
	contentTitle: 'Defualt contentTitle',
	contentBody: 'Default contentBody'
}

export default App;
