import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BookOperation extends Component {
  render() {
    return (
      <View style={styles.operation}>
        <View style={styles.flexRow}>
          <TouchableHighlight underlayColor='white' style={styles.checkAll} onPress={this.props.onCheckAll}>
            <View style={styles.checkView}>
              <View style={styles.statusIcon}>
                <Icon
                  name={this.props.isCheckAll ? 'check-circle' : 'radio-button-unchecked'}
                  color='black'
                  size={20} />
              </View>
              <Text>全选</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.total}>
            <Text style={styles.totalText}>总计：{this.props.total}</Text>
          </View>
          <View style={styles.operate}>
            <TouchableOpacity
              disabled={this.props.disabled}
              activeOpacity={.5}
              onPress={this.props.onBorrowBook}>
              <View style={{
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: this.props.disabled? "gray":this.props.lableColor
              }} >
                <Text style={styles.buttonText}>{this.props.lable}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  operation: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    right: 0,
    left: 0,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkAll: {
    width: '20%',
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  checkView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10
  },
  total: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    paddingTop: 10
  },
  totalText: {
    fontWeight: 'bold',
    color: 'black'
  },
  operate: {
    width: '30%'
  },
  button: {
    // backgroundColor: "#ffa07a",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 'bold'
  },
});


