import React from 'react';

import {
	Card,
	CardActionButton,
	CardActionButtons,
	CardActions,
	CardMedia,
	CardPrimaryAction
} from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';

import { generatePath, Link } from 'react-router-dom';

import moment from 'moment';

import urlJoin from 'url-join';

import { API_URL } from '../../constants';
import AppContext from '../context/AppContext';

import { createUseStyles } from 'react-jss';
import Title from '../../typography/Title';
import Subtitle from '../../typography/Subtitle';

const useStyles = createUseStyles({
	Media: {
		backgroundImage: props => `url(${props.electionPic})`
	},
	TextContainer: {
		padding: '0 1rem 1rem 1rem'
	},
	Title: {
		fontWeight: 400,
		marginBottom: '0.2rem'
	}
});

const ElectionCard = props => {
	const start = new Date(props.election.startTime);
	const end = new Date(props.election.endTime);

	const context = React.useContext(AppContext);

	const [now, setNow] = React.useState(context.getDate());

	if (!props.election.completed && now <= end) {
		// We passed it as a function object to prevent calling it immediately
		setTimeout(() => setNow(context.getDate()), 1000);
	}

	let to = generatePath(props.to, props.election);

	const electionPic = urlJoin(
		API_URL,
		'/api/s3',
		props.election.picture,
		`?width=400`,
		`?flags=lossy`,
		`?quality=95`
	);

	const classes = useStyles({ electionPic });

	return (
		<Card>
			<Link to={to}>
				<CardPrimaryAction>
					<CardMedia sixteenByNine className={classes.Media} />

					<div className={classes.TextContainer}>
						<Title level={5} className={classes.Title}>
							{props.election.name}
						</Title>

						<Subtitle className={classes.Subtitle}>
							Starts:{' '}
							{moment(start).format('MMM Do, YYYY hh:mma')}
						</Subtitle>
					</div>
				</CardPrimaryAction>
			</Link>

			<CardActions>
				<CardActionButtons>
					<Link to={to}>
						<CardActionButton>View</CardActionButton>
					</Link>
				</CardActionButtons>
			</CardActions>
		</Card>
	);
};

export default ElectionCard;
