import axios from 'axios';
import {MessageQueue} from "../comps/MessageQueue";

const backend = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

backend.defaults.withCredentials = true;

backend.interceptors.response.use((response) => {
	return response;
}, (error) => {
	MessageQueue.notify({
		body: "There was an error performing that action. Check your internet status.",
		actions: [{"icon": "close"}]
	});
	return Promise.reject(error);
});

export default backend;
