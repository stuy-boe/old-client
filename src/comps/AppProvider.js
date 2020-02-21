import React from "react";

import {Loading} from "./Loading";


export const AppContext = React.createContext({initialized: false});

export class AppProvider extends React.Component {

	constructor(props) {
		super(props);

		this.updateState = this.updateState.bind(this);
		this.state = {
			initialized: false,
			signedIn: false,
			user: {},
			admin: {},
			campaign: {},
			updateState: this.updateState,
			error: false
		};

	}

	updateState() {
		this.setState({error: false});
		fetch(
			`${process.env.REACT_APP_API_URL}/api/state`,
			{cache: "no-store", credentials: "include"}
			)
			.then(res => res.json())
			.then(data => {
				data.initialized = true;
				this.setState(data);
			})
			.catch(er => {
				this.setState({error: true});
			});
	}

	componentDidMount() {
		this.updateState();
	}

	render(){
		if(! this.state.initialized)
			return (
				<Loading
					error={this.state.error}
					errorMessage={"There was an error loading the app"}
					onRetry={this.updateState}
					/>
			);


		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}

}


