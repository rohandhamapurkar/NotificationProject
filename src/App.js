import React, { Component } from 'react';
import { View, AsyncStorage, AppState, DeviceEventEmitter } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers'; 

import Header from './components/Header';
import MessageCards from './components/MessageCards'
import Spinner from './components/Spinner'


const store = createStore(reducers);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  componentWillMount(){
    this.setState({isStoreLoading: true});
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

  _refresh() {
    DeviceEventEmitter.emit('refresh');
  }

  render() {
    if(this.state.isStoreLoading){
      return <Spinner></Spinner>
    } else {
      return (
        <Provider store={this.state.store}>
            <PTRView onRefresh={this._refresh}>
          <View>            
            <Header headerText={'Error Messages'}/>
              <MessageCards></MessageCards>
          </View>
            </PTRView>
        </Provider>
      );
    }
  }
}

export default App;