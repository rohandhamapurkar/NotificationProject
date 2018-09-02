import React,{ Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import CardSection from './CardSection';
import * as actions from '../actions';

class MessageCard extends Component {
    componentWillMount(){
        const { socket } = this.props;
        let that = this;
        console.log(socket);
        socket.on('notif_message',function(data){
            that.props.addMessage(data.notif_message);
        }) 
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
                <ScrollView>
                    {this.renderMessages()}
                </ScrollView>
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

export default connect(mapStateToProps,actions)(MessageCard);