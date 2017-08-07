import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import BookList from './../compponents-template/book-all'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../components-cell/form-text-input'
import FormCustomButton from './../components-cell/form-custom-botton'
import Styles from './style/book-all'
import Themes from './../src/themes/themes'
import storage from 'store2';

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
  _goToScanner=()=>{
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

export default class BookAll extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '全部',
    tabBarIcon: <Icon
      name="apps"
      size={20}
      color='white' />,
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



