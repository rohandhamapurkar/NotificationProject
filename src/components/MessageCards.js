import React,{ Component } from 'react';
import { Text, ScrollView, View, DeviceEventEmitter} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { getLog } from '../services';

import Card from './Card';
import CardSection from './CardSection';

class MessageCards extends Component {
    componentWillMount(){
        let that = this;
        DeviceEventEmitter.addListener('refresh',function(){
            getLog(that);
        })
        getLog(this);
    }
    renderMessages(){
        if(this.props.messages.length == 0){
            return(
            <View style={styles.viewCenter}>
                <Text style={styles.textCenter}>No new messages</Text>
            </View>
            ) 
        } else {
            return this.props.messages.map((message,index) => 
            <ScrollView key={index}>
                <Card>
                    <CardSection>
                        <Text>{message}</Text>
                    </CardSection>
                </Card>
            </ScrollView>
            )
        }
    }
    render(){
        return(
            <View>
                {this.renderMessages()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { messages: state.messages };
};

const styles = {
    viewCenter: {
		justifyContent: 'center',
        alignItems: 'center',
        justifyContent:'center',
        marginTop:50
    },
    textCenter: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10
    }
}

export default connect(mapStateToProps,actions)(MessageCards);