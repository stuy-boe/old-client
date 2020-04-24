import React from 'react';
import Title from '../../../typography/Title';
import BackButton from '../../BackButton';

import { Redirect } from 'react-router-dom';

import { Button } from '@rmwc/button';

import { TextField } from '@rmwc/textfield';
import '@rmwc/textfield/styles';

import { Select } from '@rmwc/select';
import '@rmwc/select/select.css';
import '@material/select/dist/mdc.select.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';

import Text from '../../../typography/Text';
import backend from '../../../utils/backend';
import ElectionPics from './ElectionPics';

import { Switch } from '@rmwc/switch';
import '@rmwc/switch/styles';

import { createUseStyles } from 'react-jss';
import MessageQueue from '../../MessageQueue';

const useStyles = createUseStyles({
	PageContainer: {
		paddingBottom: '5rem'
	},
	ElectionName: {
		marginBottom: '2rem'
	},
	ElectionTypeSelect: {
		maxWidth: '20rem',
		marginBottom: '2rem'
	},
	DateSelector: {
		minWidth: '10rem',
		marginRight: '1rem',
		marginBottom: '1rem'
	},
	TimeSelector: {
		minWidth: '9rem',
		marginBottom: '2rem'
	}
});

const CreateElection = () => {
	const classes = useStyles();

	const [name, setName] = React.useState('');
	const [type, setType] = React.useState('runoff');
	const [startDate, setStartDate] = React.useState('');
	const [startTime, setStartTime] = React.useState('');
	const [endDate, setEndDate] = React.useState('');
	const [endTime, setEndTime] = React.useState('');
	const [publicUrl, setPublicUrl] = React.useState('');
	const [publicUrlExistsIcon, setPublicUrlExistsIcon] = React.useState(null);
	const [picture, setPicture] = React.useState('');
	const [visible, setVisible] = React.useState(true);
	const [electionCreated, setElectionCreated] = React.useState(false);

	const submitForm = () => {
		const formattedStartTime = new Date(
			`${startDate} ${startTime}`
		).toISOString();
		const formattedEndTime = new Date(
			`${endDate} ${endTime}`
		).toISOString();

		backend
			.post('/api/admin/elections/create', {
				name,
				type,
				publicUrl,
				picture,
				visible,
				startTime: formattedStartTime,
				endTime: formattedEndTime
			})
			.then(res => {
				if (res.data.success) {
					setElectionCreated(true);
				}
			})
			.catch(er => {
				MessageQueue.notify({
					body: er.response.data.error.message,
					actions: [{ icon: 'close' }]
				});
			});
	};

	const electionTypes = [
		{
			label: 'Instant Runoff Election',
			value: 'runoff'
		},
		{
			label: 'Plurality (most votes)',
			value: 'plurality'
		}
	];

	const autoGenerateUrl = () => {
		setPublicUrl(
			encodeURI(
				name
					.trim()
					.replace(/[^a-zA-Z ]/g, '')
					.toLowerCase()
					.split(' ')
					.join('-')
			)
		);
	};

	// Every time the user changes the name, automatically generate a new url
	React.useEffect(autoGenerateUrl, [name]);

	const checkPublicUrlIsValid = () => {
		if (publicUrl) {
			// Set the trailingIcon to a loading icon while we check the avilability
			setPublicUrlExistsIcon('autorenew');
			backend
				.get(`/api/elections/${publicUrl}`)
				.then(res => {
					if (res.data.payload) {
						setPublicUrlExistsIcon('error_outline');
					}
				})
				.catch(er => {
					if (
						er.response &&
						er.response.data.error.code === 'NOT_FOUND'
					) {
						setPublicUrlExistsIcon('done');
					} else {
						setPublicUrlExistsIcon('error_outline');
					}
				});
		}
	};

	if (electionCreated) {
		return <Redirect to={'/elections'} />;
	}

	return (
		<div className={classes.PageContainer}>
			<BackButton text={'Manage Elections'} to={'/admin/elections'} />

			<Title level={2} center>
				Create Election
			</Title>

			<TextField
				outlined
				label="Name"
				value={name}
				onChange={ev => setName(ev.target.value)}
				required
				className={classes.ElectionName}
				onBlur={checkPublicUrlIsValid}
			/>

			<br />

			<TextField
				outlined
				label="Election Url"
				value={publicUrl}
				onChange={ev => setPublicUrl(ev.target.value.replace(' ', '-'))}
				required
				trailingIcon={publicUrlExistsIcon}
				helpText={{
					persistent: false,
					validationMsg: false,
					children: (
						<span>
							Election will be accessible at{' '}
							{window.location.host}/elections/
							<strong>{publicUrl || '<election-url>'}</strong>
						</span>
					)
				}}
				onBlur={checkPublicUrlIsValid}
			/>

			<br />
			<Select
				label="Election Type"
				enhanced
				outlined
				options={electionTypes}
				value={type}
				onChange={ev => setType(ev.target.value)}
				className={classes.ElectionTypeSelect}
			/>

			<Text>
				Timezone:{' '}
				<strong>
					{Intl.DateTimeFormat().resolvedOptions().timeZone}
				</strong>
			</Text>

			<TextField
				label="Start Date"
				type="date"
				icon={'calendar_today'}
				className={classes.DateSelector}
				value={startDate}
				outlined
				onChange={ev => setStartDate(ev.target.value)}
			/>

			<TextField
				label="Start Time"
				type="time"
				icon={'schedule'}
				className={classes.TimeSelector}
				value={startTime}
				outlined
				onChange={ev => setStartTime(ev.target.value)}
			/>

			<br />

			<TextField
				label="End Date"
				type="date"
				icon={'event'}
				className={classes.DateSelector}
				value={endDate}
				outlined
				onChange={ev => setEndDate(ev.target.value)}
			/>

			<TextField
				label="End Time"
				type="time"
				icon={'alarm'}
				className={classes.TimeSelector}
				value={endTime}
				outlined
				onChange={ev => setEndTime(ev.target.value)}
			/>
			<br />

			<Switch
				checked={visible}
				onChange={() => setVisible(!visible)}
				label={<span>&nbsp;Is Publicly Visible</span>}
			/>

			<br />
			<br />
			<Title level={6}>Election Picture:</Title>
			<ElectionPics onChange={setPicture} activePic={picture} />

			<br />

			<Button onClick={submitForm}>Submit</Button>
		</div>
	);
};

export default CreateElection;
