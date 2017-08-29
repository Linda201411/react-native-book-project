import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import BookList from './../compponents-template/book-all'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../components-cell/form-text-input'
import FormCustomButton from './../components-cell/form-custom-botton'
import Styles from './style/book-all'
import Themes from './../src/themes/themes'
import storage from 'store2';
import { changeData } from '../actions/common.action'

class BookSearchText extends Component {
  constructor(props) {
    super(props);
    var bookName = storage.session('BookName');
    this.state = {
      bookName: bookName == null ? '' : bookName
    };
  }
  _onFocusSearch = (val) => {
    const { navigate } = this.props.navigation;
    navigate('Search');
  }
  _goToScanner = () => {
    const { navigate } = this.props.navigation;
    navigate('Scanner');
  }
  _onClearSearchItem = () => {
    storage.session('BookName', '');
    this.setState({
      bookName: ''
    });
    //this.props.dispatch(changeData());
  }
  render() {
    return (
      <View style={Styles.headView}>
        <TouchableOpacity
          style={Styles.searchView}
          onPress={this._onFocusSearch}>
          <View style={Styles.searchText}>
            <Icon
              name="search"
              size={20} />
            <Text>{this.state.bookName == '' ? "search" : this.state.bookName}</Text>
          </View>
          {
            this.state.bookName == '' ?
              <View />
              :
              <TouchableOpacity style={Styles.clearIcon}>
                <Icon
                  name="close"
                  onPress={this._onClearSearchItem}
                  size={20} />
              </TouchableOpacity>
          }
        </TouchableOpacity>
        <Icon onPress={this._goToScanner}
          style={Styles.scanIcon}
          name="crop-free"
          size={25}
          color={Themes.color} />
      </View>
    );
  }
}

export default class BookAll extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) =>
      <View style={{ alignItems: 'center' }}>
        <Icon
          name="apps"
          size={20}
          color={tintColor} />
        <Text style={{ color: tintColor }}>全部</Text>
      </View>,
    headerTitle: <BookSearchText navigation={navigation} />,
    // headerRight:
    // <TouchableHighlight>
    //   <Icon
    //     style={{ marginRight: 10 }}
    //     name="dehaze"
    //     size={20} />
    // </TouchableHighlight>
  });
  render() {
    return (
      <BookList navigation={this.props.navigation} />
    );
  }
}



