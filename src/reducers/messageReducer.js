export default (state=[], action) => {
    switch (action.type) {
		case 'add_message':
			return [...state,action.payload];
		default:
			return state;
	}
}