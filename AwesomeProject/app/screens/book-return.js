import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import Return from './../compponents-template/book-return'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'antd-mobile';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    OverTimeCount: store.bookReturnReducer.OverTimeCount
  }
})

class ReturnIcon extends Component {
  render() {
    return (
      <View>
        {this.props.OverTimeCount > 0 ?
          <View>
            <Icon
              name="assignment-return"
              size={20}
              color={this.props.color} />
            <Badge dot style={{ position: 'absolute', right: 5, top: 2 }}></Badge>
          </View>
          :
          <Icon
            name="assignment-return"
            size={20}
            color={this.props.color} />}
      </View>
    )
  }
}

export default class BookReturn extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon:({ tintColor }) =>
    <View style={{alignItems:'center'}}>
      <ReturnIcon navigation={navigation} color={tintColor}/>
      <Text style={{ color: tintColor }}>还书</Text>
    </View>
  });
  render() {
    return (
      <Return navigation={this.props.navigation} />
    );
  }
}