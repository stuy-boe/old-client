import React from "react";

import Loading from "./Loading";
import backend from "../utils/backend";
import Retry from "./Retry";


export const AppContext = React.createContext({initialized: false});

export class AppProvider extends React.Component {

	constructor(props) {
		super(props);

		this.updateState = this.updateState.bind(this);
		this.state = {
			signedIn: false,
			user: {},
			admin: {},
			campaignManager: {},
			updateState: this.updateState,
			status: "loading"
		};

	}

	updateState() {
		this.setState({status: "loading"});

		backend.get("/api/state")
			.then(({data}) => this.setState({status: "loaded", ...data.payload}))
			.catch(er => {

				this.setState({status: "error"});

			});
	}

	componentDidMount() {
		this.updateState();
	}

	render(){

		if( this.state.status === "loading" ) {
			return (
				<Loading />
			);
		}

		if( this.state.status === "error" ){
			return (
				<Retry
					onRetry={this.updateState}
					message={"There was an error loading the app."}
				/>
			)
		}

		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}

}


