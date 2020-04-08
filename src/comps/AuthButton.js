import React from "react";
import { GoogleLogin } from 'react-google-login';
import {AppContext} from "./AppProvider";
import {MessageQueue} from "./MessageQueue";

import {SimpleDialog} from "@rmwc/dialog";
import '@material/dialog/dist/mdc.dialog.css';
import '@material/button/dist/mdc.button.css';
import backend from "../utils/backend";

export const AuthButton = (props) => {
	const context = React.useContext(AppContext);
	const [payload, setPayload] = React.useState({unset: true});

	const attemptLogin = (data = payload) => {

		backend.post("/api/auth/login", {idToken: data.tokenId})
			.then(({data}) => {
				context.updateState() || window.sessionStorage.clear();
			})
			.catch((request) => {

				if(request.response) {

					MessageQueue.notify({
						body: request.response.data.error.message,
						actions: [{"icon": "close"}]
					});

				}
			});

	};

	const handleSuccess = (data) => {
		if(! data.profileObj.email.endsWith("@stuy.edu"))
			return setPayload({email: data.profileObj.email, tokenId: data.tokenId, unset: false});

		attemptLogin(data);
	};

	return (
		<div>
			<SimpleDialog
				title="Confirm Email"
				body={`You're attempting to sign in with an email address (${payload.email}) that doesn't belong to the @stuy.edu organization. This will limit your functionality and prevent your votes from being recorded. Are you sure you want to continue?`}
				open={! payload.unset}
				onClose={evt => {
					if(evt.detail.action === "accept")
						attemptLogin({...payload});
					setPayload({unset: true});
				}}
			/>

			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText="Login with Google"
				onSuccess={handleSuccess}
				onFailure={(er) => {console.log(er)}}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	)
};
