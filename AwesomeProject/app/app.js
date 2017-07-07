
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Route from './components-page/route'
import store from './store';

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Route/>
        </Provider>
      );
  }
}

