import React from 'react';
import AppContext from '../context/AppContext';
import MessageQueue from '../queues/MessageQueue';
import Script from 'react-load-script';
import backend from '../../tools/backend';
import { GOOGLE_CLIENT_ID } from '../../constants';
import { Helmet } from 'react-helmet';
import DialogQueue from '../queues/DialogQueue';
import Text from '../../typography/Text';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	GoogleButton: {
		height: '40px'
	}
});

const AuthButton = () => {
	const classes = useStyles();

	const { updateState } = React.useContext(AppContext);
	const [buttonId] = React.useState(`auth-button-${Math.random() * 1000}`);

	const attemptLogin = idToken => {
		backend
			.post('/api/auth/login', { idToken })
			.then(res => {
				if (res.data.success) {
					updateState();
				}
			})
			.catch(e => {
				if (e.response) {
					MessageQueue.notify({
						body: e.response.data.error.message,
						actions: [{ icon: 'close' }]
					});
				}
			});
	};

	const handleSuccess = async data => {
		const email = data.Pt.yu;
		const idToken = data.tc.id_token;
		let confirmation = true;
		if (!email.endsWith('@stuy.edu')) {
			confirmation = await DialogQueue.confirm({
				title: 'Confirm Email',
				body: (
					<Text>
						You're attempting to sign in with an email address{' '}
						{email} that doesn't belong to the @stuy.edu
						organization. This will limit your functionality and
						prevent your votes from being recorded. Are you sure you
						want to continue?
					</Text>
				)
			});
		}

		if (confirmation) {
			attemptLogin(idToken);
		}
	};

	const renderButton = () => {
		window.gapi.load('auth2', function () {
			/**
			 * Retrieve the singleton for the GoogleAuth library and set up the
			 * client.
			 */

			const auth2 = window.gapi.auth2.init({
				client_id: GOOGLE_CLIENT_ID
			});

			// Attach the click handler to the sign-in button
			auth2.attachClickHandler(buttonId, {}, handleSuccess, console.log);
		});
	};

	return (
		<div>
			<Helmet>
				<meta name="google-signin-scope" content="profile email" />
				<meta
					name="google-signin-client_id"
					content={GOOGLE_CLIENT_ID}
				/>
			</Helmet>
			<Script
				url="https://apis.google.com/js/platform.js"
				onLoad={renderButton}
			/>

			<div id={buttonId} className={classes.GoogleButton}>
				<p>Google Auth</p>
			</div>
		</div>
	);
};

export default AuthButton;
