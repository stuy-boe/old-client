import React from 'react';
import AdminElectionContext from './AdminElectionContext';
import backend from '../../../tools/backend';
import MessageQueue from '../../queues/MessageQueue';
import ElectionDataForm from './ElectionDataForm';

class EditElection extends React.Component {
	static contextType = AdminElectionContext;

	constructor(props) {
		super(props);

		this.setFormValue = (name, value) => {
			this.setState({ [name]: value });
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.checkPublicUrl = this.checkPublicUrl.bind(this);

		this.state = {
			name: '',
			type: '',
			startDate: '',
			startTime: '',
			endDate: '',
			endTime: '',
			publicUrl: '',
			publicUrlIcon: '',
			grades: [],
			picture: '',
			visible: true,
			success: false,
			setFormValue: this.setFormValue,
			onSubmit: this.onSubmit,
			checkPublicUrl: this.checkPublicUrl
		};
	}

	formatDate(date) {
		const year = 1900 + date.getYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');

		return `${year}-${month}-${date.getDate()}`;
	}

	formatTime(date) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${hours}:${minutes}`;
	}

	componentDidMount() {
		const contextCopy = JSON.parse(JSON.stringify(this.context));

		const start = new Date(contextCopy.startTime);
		const end = new Date(contextCopy.endTime);

		contextCopy.startDate = this.formatDate(start);
		contextCopy.startTime = this.formatTime(start);

		contextCopy.endDate = this.formatDate(end);
		contextCopy.endTime = this.formatTime(end);

		contextCopy.grades = contextCopy.allowedGrades;
		this.setState(contextCopy);
	}

	checkPublicUrl() {
		const isOriginalValue = this.state.publicUrl === this.context.publicUrl;

		if (this.state.publicUrl && !isOriginalValue) {
			// Set the trailingIcon to a loading icon while we check the avilability
			this.setState({ publicUrlIcon: 'autorenew' });

			backend
				.get(`/api/elections/${this.state.publicUrl}`)
				.then(res => {
					if (res.data.payload) {
						this.setState({ publicUrlIcon: 'error_outline' });
					}
				})
				.catch(er => {
					if (
						er.response &&
						er.response.data.error.code === 'NOT_FOUND'
					) {
						this.setState({ publicUrlIcon: 'done' });
					} else {
						this.setState({ publicUrlIcon: 'error_outline' });
					}
				});
		} else if (isOriginalValue) {
			this.setState({ publicUrlIcon: 'done' });
		}
	}

	onSubmit() {}

	render(): React.ReactNode {
		return <ElectionDataForm {...this.state} />;
	}
}

export default EditElection;
