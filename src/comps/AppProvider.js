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

	async updateState() {

		this.setState({status: "loading"});

		try {

			// The reason we make two requests is because the server might be sleeping
			// That would then result in inaccurate request duration calculations
			// The first /api/state request would wake up the server
			// Then the server is already awake when we get /api/date

			const getState = await backend.get("/api/state");
			const payload = getState.data.payload;

			const requestStartTime = new Date();
			const getDate = await backend.get("/api/date");
			const serverDateString = getDate.date.payload.date;

			const now = new Date();
			const requestDuration = now.getTime() - requestStartTime.getTime();
			const serverStartTime = new Date(serverDateString);

			const serverTime = new Date( serverStartTime.getTime() + requestDuration );

			const dateOffset = serverTime.getTime() - now.getTime();

			this.setState({
				status: "loaded",
				dateOffset,
				...payload
			});

		} catch (e) {

			this.setState({status: "error"});

		}

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


