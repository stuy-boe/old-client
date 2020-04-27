import React from 'react';

import { createUseStyles } from 'react-jss';
import { SimpleDialog } from '@rmwc/dialog';
import '@rmwc/dialog/styles';

import { Button } from '@rmwc/button';
import ElectionPicList from './ElectionPicList';

import { Icon } from '@rmwc/icon';

import { useDropzone } from 'react-dropzone';

import FlexCenter from '../../utils/FlexCenter';
import Text from '../../../typography/Text';
import MessageQueue from '../../queues/MessageQueue';

const useStyles = createUseStyles({
	ImageContainer: {
		maxHeight: '50vh',
		overflowY: 'auto',
		opacity: props => (props.isDragActive ? 0.6 : 1)
	},
	UploadContainer: {
		height: '6rem',
		borderRadius: '5px',
		border: '2px solid gray',
		marginBottom: '1rem',
		paddingTop: '0.5rem',
		cursor: 'pointer'
	}
});

const ElectionPicDialog = ({ setSelectedPic, selectedPic }) => {
	const [open, setOpen] = React.useState(false);
	const [activePic, setActivePic] = React.useState(selectedPic);

	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone(
		{
			// Disable click and keydown behavior
			noClick: true,
			noKeyboard: true,
			onDrop: acceptedFiles => {
				const isImage = Boolean(acceptedFiles.length);

				if (isImage) {
					// do some stuff with the image
				} else {
					MessageQueue.notify({
						body: 'You are only allowed to upload image files.'
					});
				}
			},
			accept: 'image/*'
		}
	);

	const classes = useStyles({ isDragActive });

	return (
		<div>
			<SimpleDialog
				title={'Select An Election Picture'}
				open={open}
				{...getRootProps()}
				body={
					<div className={classes.ImageContainer}>
						<FlexCenter className={classes.UploadContainer}>
							<div onClick={() => inputRef.current.click()}>
								<FlexCenter>
									<input {...getInputProps()} type={'file'} />
									<Icon icon={'add_photo_alternate'} />
								</FlexCenter>
								<Text>Click Here To Upload A New Image</Text>
							</div>
						</FlexCenter>
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
