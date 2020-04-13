// @flow
import React from 'react';

import type { Node } from 'react';

import { Button } from '@rmwc/button';
import '@material/button/dist/mdc.button.css';

type Props = {
	onRetry: Function,
	message: string | Node
};

const Retry = (props: Props) => {
	return (
		<div style={{ paddingTop: 'calc(50vh - 72px)' }}>
			{typeof props.message === 'string' ? (
				// If the message is a string, enclose it in a heading
				<h1 style={{ textAlign: 'center' }}>
					{props.message}
				</h1>
			) : (
				// Otherwise it is a component and we should render as-is
				props.message
			)}

			<div className={['flex-center']}>
				<Button outlined onClick={props.onRetry}>
					Retry
				</Button>
			</div>
		</div>
	);
};

export default Retry;
