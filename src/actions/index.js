export const updateMessages = (messages) => {
	return {
		type: 'update_messages',
		payload: messages
	};
};