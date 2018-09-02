import React, {Component} from 'react';
import { View, AsyncStorage, AppState } from 'react-native';
import reducers from './reducers'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { socketURL } from '../env';
const io = require('socket.io-client');

import Header from './components/Header';
import MessageCard from './components/MessageCard'
import Spinner from './components/Spinner'

let store = createStore(reducers);

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  componentWillMount(){
    this.setState({isStoreLoading: true});
    this.socket = io(socketURL,{
      transports: ['websocket'],
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionDelayMax' : 5000,
      'reconnectionAttempts': 5
    });
    this.socket.on('connect',function(){
        console.log("connection aya!!");
    })
    this.socket.on('disconnect',function(){
        console.log('disconnected');
    })
    let that = this;
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    AsyncStorage.getItem('completeStore').then((value)=>{
      if(value && value.length){
        let initialStore = JSON.parse(value)
        that.setState({store: createStore(reducers, initialStore)});
      }else{
        that.setState({store: store});
      }
      that.setState({isStoreLoading: false});
    }).catch((error)=>{
      that.setState({store: store});
      that.setState({isStoreLoading: false});
    })
  }

  _handleAppStateChange(currentAppState) {
    let storingValue = JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore', storingValue);
  }

  render() {
    if(this.state.isStoreLoading){
      return <Spinner></Spinner>
    } else {
      return (
        <Provider store={this.state.store}>
          <View>
            <Header headerText={'Error Messages'}/>
            <MessageCard socket={this.socket}></MessageCard>
          </View>
        </Provider>
      );
    }
  }
}
