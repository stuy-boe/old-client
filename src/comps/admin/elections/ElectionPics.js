import React from 'react';
import backend from '../../../utils/backend';

import { ImageList, ImageListItem, ImageListImage } from '@rmwc/image-list';
import '@rmwc/image-list/styles';
import urlJoin from 'url-join';
import { API_URL } from '../../../constants';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	SelectedItem: {
		border: 'solid 0.5rem #1abc9c'
	},
	ImageContainer: {
		height: '20rem',
		overflowY: 'scroll',
		borderRadius: '0.5rem',
		border: '0.1rem solid black',
		padding: '1rem',
		marginRight: '1rem',
		maxWidth: '80%'
	},
	InnerImageContainer: {
		columnCount: Math.ceil(window.innerWidth / 400),
		columnGap: '16px',
		width: '100%',
		overflow: 'auto'
	}
});

const ElectionPics = ({ onChange, activePic }) => {
	const classes = useStyles();
	const [electionPics, setElectionPics] = React.useState([]);

	React.useEffect(() => {
		backend.get('/api/admin/elections/pics/list').then(({ data }) => {
			setElectionPics(data.payload);
		});
	}, []);

	return (
		<div className={classes.ImageContainer}>
			<ImageList
				masonry
				withTextProtection
				className={classes.InnerImageContainer}
			>
				{electionPics.map(src => {
					const absoluteSrc = urlJoin(
						API_URL,
						`/api/s3`,
						src,
						`?width=360`,
						`?flags=lossy`,
						`?quality=auto`
					);

					const specialClass =
						activePic === src ? classes.SelectedItem : '';

					return (
						<ImageListItem
							onClick={() => onChange(src)}
							key={src}
							style={{ marginBottom: '16px' }}
							className={specialClass}
						>
							<ImageListImage src={absoluteSrc} />
						</ImageListItem>
					);
				})}
			</ImageList>
		</div>
	);
};

export default ElectionPics;
