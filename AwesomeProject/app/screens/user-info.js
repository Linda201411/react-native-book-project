import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Text } from 'react-native';
import UserDeatil from './../compponents-template/user-info'
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserLogout from './../components-cell/user-logout'
import { connect } from 'react-redux';
import { getPermission } from '../actions/account.action'

@connect((store) => {
  return {
    permission: store.accountReducer.permission
  }
})

class HeadInfo extends Component {
  render() {
    return (
      <Text style={{ paddingLeft: 10 }}>{this.props.permission.RealName}</Text>
    )
  }
}


export default class UserInfo extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '我的',
    tabBarIcon: ({ tintColor }) =>
      <View style={{ alignItems: 'center' }}>
        <Icon
          name="person"
          size={20}
          color={tintColor} />
        <Text style={{ color: tintColor }}>我的</Text>
      </View>,
    headerTitle: <HeadInfo />,
    // headerRight: (
    //   <UserLogout navigation={navigation} />)
  });
  render() {
    return (
      <UserDeatil navigation={this.props.navigation} />
    );
  }
}