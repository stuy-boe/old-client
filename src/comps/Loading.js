import React from "react";

import {Button} from "@rmwc/button";
import '@material/button/dist/mdc.button.css';

import {CircularProgress} from "@rmwc/circular-progress";
import '@rmwc/circular-progress/circular-progress.css';

export const Loading = ({error, onRetry, errorMessage}) => {
	return (
		<div>
			{error ?
				(
					<div style={{paddingTop: "calc(50vh - 72px)"}}>
						{/*	Error screen with a refresh button */}
						<h3 style={{textAlign: "center"}}>{errorMessage}</h3>

						<div className={["flex-center"]}>
							<Button outlined onClick={onRetry}>Retry</Button>
						</div>
					</div>
				)
				:
				(
					<div
						className={["flex-center"]}
						style={{
							paddingTop: "calc(50vh - 72px)"
						}}
					>
						{/*	Loading Screen */}
						<CircularProgress size={72} />
					</div>
				)
			}
		</div>
	)
};
