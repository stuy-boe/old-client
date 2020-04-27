import React from 'react';
import FlexCenter from '../comps/utils/FlexCenter';
import Title from '../typography/Title';

import { createUseStyles } from 'react-jss';
import Text from '../typography/Text';
import BackButton from '../comps/utils/BackButton';
const useStyles = createUseStyles({
	ErrorImage: {
		width: '700px',
		maxWidth: '80%'
	},
	Text: {
		color: '#904e69'
	}
});

const Error403 = () => {
	const classes = useStyles();

	return (
		<div>
			<BackButton text={'Back To Home'} to={'/'} />
			<FlexCenter>
				<div>
					<Title level={2} center className={classes.Text}>
						Access Denied
					</Title>
					<FlexCenter>
						<img
							className={classes.ErrorImage}
							src={'/img/unauthorized-bouncer.svg'}
							alt={'A person gets reviewed by a bouncer'}
						/>
					</FlexCenter>
					<Text center className={classes.Text}>
						Sorry, but you don't have permission to view this page.
					</Text>
				</div>
			</FlexCenter>
		</div>
	);
};

export default Error403;
