import React from 'react';
import update from 'react-addons-update'

class App extends React.Component{
	render(){
		return (
			<Contacts/>
		);
	}
}


class Contacts extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			contactData: [
				{name: "Abet", phone: "010-0000-0001"},
				{name: "Betty", phone: "010-0000-0002"},
				{name: "Charlie", phone: "010-0000-0003"},
				{name: "David", phone: "010-0000-0004"},
			]	,
			selectedKey: -1,
			selected: {
				name: "",
				phone: ""
			}
		}
	}

	_insertContact(name, phone){
		/*
		let newState = update(
			this.state, 
			{
				contactData:{
					$push: [{"name": name, "phone": phone}]	
				}	
			}
		);	
		this.setState(newState);
		*/
		this.setState({
			contactData: update(
				this.state.contactData,
				{
					$push: [{"name": name, "phone":phone}]		
				}	
			)
		});
	}

	_onSelect(key){
		if (key == this.state.selectedKey){
			console.log("Key select cancelled");	
			this.setState({
				selectedKey: -1	,
				selcted: {
					name: "",
					phone: ""
				}
			});
			return;
		}	

		this.setState({
			selectedKey: key	,
			selected: this.state.contactData[key]
		});
		console.log(key + " is selected");
	}


	_isSelected(key){
		if (this.state.selectedKey == key){
			return true;	
		} else {
			return false;	
		}
	}

	_removeContact(){
		if (this.state.selectedKey == -1){
			console.log("contact not selected");	
			return;
		}	

		this.setState({
			contactData: update(
				this.state.contactData,
				{
					$splice: [[this.state.selectedKey, 1]]	
				}
			),
			selectedKey: -1
		});
	}

	_editContact(name, phone){
		this.setState({
			contactData: update(
				this.state.contactData,
				{
					[this.state.selectedKey]: {
						name: { $set: name },
						phone: { $set: phone },
					}	
				}
			),	
			selected: {
				name: name,
				phone: phone
			}
		});	
	}

	render(){
		return (
			<div>
				<h1>Contacts</h1>
				<ul>
					{this.state.contactData.map((contact, i) => {
						/*근데 이거 selectedKey하나 바뀌면 모든애가 다시 그려지는건 아님?
							근데 스테이트가 같은놈은 알아서 안그려주겠지뭐*/
						return (
							<ContactInfo name={contact.name} 
														phone={contact.phone} 
														key={i}
														contactKey={i}
														/*isSelected 함수가 호출되서 값이 들어가는 부분임*/
														isSelected={this._isSelected.bind(this)(i)}
														onSelect={this._onSelect.bind(this)}/>
						);	
					})}
				</ul>
				<ContactCreator onInsert={this._insertContact.bind(this)}/>
				<ContactRemover onRemove={this._removeContact.bind(this)}/>
				<ContactEditor onEdit={this._editContact.bind(this)}
												isSelected={(this.state.selectedKey != -1)}
												contact={this.state.selected} />
			</div>
		);	
	}
}

class ContactInfo extends React.Component{
	handleClick(){
		this.props.onSelect(this.props.contactKey);
	}

	shouldComponentUpdate(nextProps, nextState){
		// 일단 랜더링 할 때, props만 가지고 하니까 props만 비교해도 될듯(여기선)
		return (JSON.stringify(nextProps) != JSON.stringify(this.props));
	}

	render(){
		console.log("rendered: " + this.props.name);

		let getStyle = isSelect => {
			if (!isSelect) return;

			let style = {
				fontWeight: 'bold',
				backgroundColor: '#4efcd8'
			};

			return style;
		};

		return (
			<li style={getStyle(this.props.isSelected)} 
					onClick={this.handleClick.bind(this)}>
					{this.props.name} {this.props.phone}
			</li>	
		);	
	}
}


class ContactCreator extends React.Component{
	constructor(props){
		super(props);
		// configure default state
		this.state = {
			name: "",
			phone: ""
		};
	}

	// 여기서 state를 변경시켜줘야되
	// 그렇지 않으면 값이 안바뀜
	handleChange(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick(){
		// 부모의 state의 data 배열에 값 추가해주기
		this.props.onInsert(this.state.name, this.state.phone);	
		this.setState({
			name: "",
			phone: ""
		});
	}

	render(){
		return (
			<div>	
				<p>
					<input type="text" 
									name="name" 
									placeholder="name" 
									value={this.state.name}
									onChange={this.handleChange.bind(this)}/>
					<input type="text" 
									name="phone" 
									placeholder="phone" 
									value={this.state.phone}
									onChange={this.handleChange.bind(this)}/>
					<button onClick={this.handleClick.bind(this)}>
						Insert
					</button>
				</p>
			</div>	
		);
	}
}


class ContactRemover extends React.Component{
		handleClick(){
			this.props.onRemove();	
		}	

		render(){
			return (
				<button onClick={this.handleClick.bind(this)}>
					Remove Selected Contact
				</button>
			);
		}
}


class ContactEditor extends React.Component {
	constructor(props){
		super(props);
		// configure default state
		this.state = {
			name: "",
			phone: ""
		};
	}

	handleChange(e){
		var nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick(){
		if(!this.props.isSelected){
			console.log("Contact not selected")		
			return;
		}	
		this.props.onEdit(this.state.name, this.state.phone);
	}

	render(){
		return(
			<div>
				<p>
					<input type="text"
									name="name"
									placeholder="name"
									value={this.state.name}
									onChange={this.handleChange.bind(this)}/>
					<input type="text"
									name="phone"
									placeholder="phone"
									value={this.state.phone}
									onChange={this.handleChange.bind(this)}/>
					<button onClick={this.handleClick.bind(this)}>
						Edit
					</button>
				</p>
			</div>
		);	
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			name: nextProps.contact.name,
			phone: nextProps.contact.phone
		})	
	}
}
export default App;
