import React from 'react';
import { Helmet } from 'react-helmet';
import Title from '../typography/Title';
import Text from '../typography/Text';
import { Button } from '@rmwc/button';
import FlexCenter from '../comps/utils/FlexCenter';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	Image: {
		maxWidth: '80vw',
		width: '350px'
	}
});

const Error404 = () => {
	const classes = useStyles();

	return (
		<FlexCenter fullHeight>
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
				<Title level={3} center>
					Page Not Found
				</Title>

				<FlexCenter>
					<img
						className={classes.Image}
						src={'/img/shrug-emote.svg'}
						alt={'Cloud Shrugging'}
					/>
				</FlexCenter>

				<Text center>
					We looked everywhere, but that page doesn't seem to be in
					the clouds
				</Text>

				<br />

				<FlexCenter>
					<Link to={'/'}>
						<Button outlined>Go Back Home</Button>
					</Link>
				</FlexCenter>
			</div>
		</FlexCenter>
	);
};

export default Error404;
