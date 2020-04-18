import React from 'react';

import {
	Card,
	CardActionButton,
	CardActionButtons,
	CardActionIcon,
	CardActionIcons,
	CardActions,
	CardMedia,
	CardPrimaryAction
} from '@rmwc/card';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';

import { Typography } from '@rmwc/typography';
import '@material/typography/dist/mdc.typography.css';

import { generatePath, Link } from 'react-router-dom';

import moment from 'moment';

import urlJoin from 'url-join';

import { API_URL } from '../../constants';
import { AppContext } from '../AppProvider';

export const ElectionCard = props => {
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
		`?width=360`
	);

	return (
		<Card>
			<Link to={to}>
				<CardPrimaryAction>
					<CardMedia
						sixteenByNine
						style={{ backgroundImage: `url(${electionPic})` }}
					/>
					<div
						style={{
							padding: '0 1rem 1rem 1rem'
						}}
					>
						<Typography use="headline6" tag="h2">
							{props.election.name}
						</Typography>

						<Typography
							use="subtitle2"
							tag="h3"
							theme="textSecondaryOnBackground"
							style={{ marginTop: '-1rem' }}
						>
							Starts:{' '}
							{moment(start).format('MMM Do, YYYY hh:mma')}
						</Typography>

						<Typography
							use="body1"
							tag="div"
							theme="textSecondaryOnBackground"
						>
							{props.election.publicResults
								? 'Results are publicly visible'
								: 'Results are not publicly visible'}
						</Typography>
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
