import React from 'react';
import { Text, View } from 'react-native';


const Header = (props) => {
    const {headerText} = props;
    const {textStyle, viewStyle} = styles;
    return(
        <View style = {viewStyle}>
			<Text style = {textStyle}>{headerText}</Text>
		</View>
    )
}

var styles = {
    viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
        paddingTop: 15,
        paddingBottom: 15,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 18,
		color:'black'
	}
}
export default Header;