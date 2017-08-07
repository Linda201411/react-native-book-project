import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../components-cell/form-text-input'
import BookSearchResult from './../compponents-template/book-search-result'
import storage from 'store2';
import Styles from './style/book-search-result-screen'

class BookSearchText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: ''
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
  render() {
    var BookName = storage.session('BookName');
    BookName = BookName == null ? "search" : BookName;
    return (
      <View style={Styles.headView}>
        <TouchableOpacity
          style={Styles.searchView}
          onPress={this._onFocusSearch}>
          <Icon
            name="search"
            size={20} />
          <Text>{BookName}</Text>
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

export default class BookSearchResultScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <BookSearchText navigation={navigation} />
  });
  render() {
    return (
      // <BookSearchResult navigation={this.props.navigation} />
      <Text>查询结果</Text>
    );
  }
}



