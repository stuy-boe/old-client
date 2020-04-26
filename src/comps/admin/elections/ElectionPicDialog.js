import React from 'react';

import { createUseStyles } from 'react-jss';
import { SimpleDialog } from '@rmwc/dialog';
import '@rmwc/dialog/styles';

import { Button } from '@rmwc/button';
import ElectionPicList from './ElectionPicList';

const useStyles = createUseStyles({
	ImageContainer: {
		maxHeight: '50vh',
		overflowY: 'auto'
	}
});

const ElectionPicDialog = ({ setSelectedPic, selectedPic }) => {
	const [open, setOpen] = React.useState(false);
	const [activePic, setActivePic] = React.useState(selectedPic);

	const classes = useStyles();

	return (
		<div>
			<SimpleDialog
				title={'Select An Election Picture'}
				open={open}
				body={
					<div className={classes.ImageContainer}>
						<ElectionPicList
							setActivePic={setActivePic}
							activePic={activePic}
						/>
					</div>
				}
				onClose={evt => {
					if (
						evt.detail.action === 'accept' &&
						activePic !== selectedPic
					) {
						setSelectedPic(activePic);
					}
					setOpen(false);
				}}
				acceptLabel={'Select'}
			/>

			<Button outlined onClick={() => setOpen(true)} icon={'collections'}>
				Select Picture
			</Button>
		</div>
	);
};

export default ElectionPicDialog;
