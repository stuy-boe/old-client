import React from "react";

import Loading from "./Loading";
import backend from "../utils/backend";
import Retry from "./Retry";


export const AppContext = React.createContext({initialized: false});

export class AppProvider extends React.Component {

	constructor(props) {
		super(props);

		this.updateState = this.updateState.bind(this);
		this.getDate = this.getDate.bind(this);

		this.state = {
			signedIn: false,
			user: {},
			admin: {},
			campaignManager: {},
			dateOffset: 0,
			updateState: this.updateState,
			getDate: this.getDate,
			status: "loading"
		};

	}


	getDate() {

		const localTimestamp = new Date().getTime();

		return new Date( localTimestamp +  this.state.dateOffset);

	}

	updateState() {
		const requestStartTime = new Date();

		this.setState({status: "loading"});

		backend.get("/api/state")
			.then(({data}) => {

				const payload = data.payload;

				const now = new Date();
				const requestDuration = now.getTime() - requestStartTime.getTime();
				const serverStartTime = new Date(payload.date);

				const serverTime = new Date( serverStartTime.getTime() + requestDuration );

				const dateOffset = serverTime.getTime() - now.getTime();

				this.setState({
					status: "loaded",
					dateOffset,
					...payload
				});

			})
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


