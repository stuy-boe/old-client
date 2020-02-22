import React from "react";

import {Loading} from "./Loading";
import backend from "../utils/backend";


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

		backend.get("/api/state")
			.then(({data}) => this.setState({initialized: true, ...data.payload}))
			.catch(er => this.setState({error: true}));
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


