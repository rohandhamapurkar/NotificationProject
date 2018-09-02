export const addMessage = (message) => {
	return {
		type: 'add_message',
		payload: message
	};
};