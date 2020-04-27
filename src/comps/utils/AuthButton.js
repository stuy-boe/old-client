import React from 'react';
import { API_URL, GOOGLE_CLIENT_ID } from '../../constants';
import DialogQueue from '../queues/DialogQueue';
import Text from '../../typography/Text';
import GoogleLogin from 'react-google-login';
import urlJoin from 'url-join';

const AuthButton = () => {
	const attemptLogin = idToken => {
		window.location.href = urlJoin(
			API_URL,
			`/api/auth/login`,
			`?idToken=${encodeURIComponent(idToken)}`,
			`?redirect=${window.location.href}`
		);
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

	return (
		<GoogleLogin
			onSuccess={handleSuccess}
			onFailure={console.log}
			clientId={GOOGLE_CLIENT_ID}
		/>
	);
};

export default AuthButton;
