export default (state=[], action) => {
    switch (action.type) {
		case 'update_messages':
			return action.payload;
		default:
			return state;
	}
}