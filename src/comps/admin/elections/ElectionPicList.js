import React from 'react';
import backend from '../../../tools/backend';

import { ImageList, ImageListImage, ImageListItem } from '@rmwc/image-list';
import '@rmwc/image-list/styles';

import urlJoin from 'url-join';
import { API_URL } from '../../../constants';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	SelectedItem: {
		border: 'solid 0.5rem #1abc9c',
		marginBottom: '10px',
		borderRadius: '5px',
		overflow: 'hidden'
	},
	UnselectedItem: {
		marginBottom: '10px',
		borderRadius: '5px',
		overflow: 'hidden'
	},
	InnerImageContainer: {
		columnCount: window.innerWidth > 600 ? 2 : 1,
		columnGap: '10px'
	}
});

const ElectionPicList = ({ activePic, setActivePic, uploadedPics }) => {
	const classes = useStyles();
	const [electionPics, setElectionPics] = React.useState([]);

	React.useEffect(() => {
		backend.get('/api/admin/elections/pics/list').then(({ data }) => {
			setElectionPics(data.payload);
		});
	}, []);

	const completePicsList = [...uploadedPics, ...electionPics];
	return (
		<ImageList
			masonry
			className={classes.InnerImageContainer}
			withTextProtection
		>
			{completePicsList.map(src => {
				const absoluteSrc = urlJoin(
					API_URL,
					`/api/s3`,
					src,
					`?width=200`,
					`?height=150`,
					`?crop=fill`,
					`?flags=lossy`,
					`?quality=95`
				);

				const specialClass =
					activePic === src
						? classes.SelectedItem
						: classes.UnselectedItem;

				return (
					<ImageListItem
						onClick={() => setActivePic(src)}
						key={src}
						className={specialClass}
					>
						<ImageListImage src={absoluteSrc} />
					</ImageListItem>
				);
			})}
		</ImageList>
	);
};

export default ElectionPicList;
