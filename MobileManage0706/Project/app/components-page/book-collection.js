import React, { Component } from 'react';
import { View, StyleSheet,Button } from 'react-native';
import Collection from './../compponents-template/book-collection'

export default class BookHistory extends Component {
  static navigationOptions = {
    tabBarLabel: '个人',
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  render() {
    return (
        <Collection navigation={this.props.navigation}/>
    );
  }
}


