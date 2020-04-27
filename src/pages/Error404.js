import React from 'react';
import { Helmet } from 'react-helmet';
import Title from '../typography/Title';
import Text from '../typography/Text';
import FlexCenter from '../comps/utils/FlexCenter';
import { createUseStyles } from 'react-jss';
import BackButton from '../comps/utils/BackButton';

const useStyles = createUseStyles({
	Image: {
		maxWidth: '80%',
		width: '800px'
	},
	Text: {
		color: '#607c8b'
	}
});

const Error404 = () => {
	const classes = useStyles();

	return (
		<div>
			<BackButton text={'Back To Home'} to={'/'} />

			<FlexCenter>
				<div>
					<Helmet>
						<title>{'Page Not Found | Stuy BOE Voting Site'}</title>

						<meta
							property="og:title"
							content={'Page Not Found | Stuy BOE Voting Site'}
						/>

						<meta
							property="og:description"
							content={`We looked everywhere, but we couldn't find that page :'(`}
						/>
					</Helmet>
					<Title level={2} center className={classes.Text}>
						Page Not Found
					</Title>

					<FlexCenter>
						<img
							className={classes.Image}
							src={'/img/ship-not-found.svg'}
							alt={
								'Someone looking through clouds with a telescope'
							}
						/>
					</FlexCenter>

					<Text center className={classes.Text}>
						That page doesn't seem to be in the clouds
					</Text>
				</div>
			</FlexCenter>
		</div>
	);
};

export default Error404;
