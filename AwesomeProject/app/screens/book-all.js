import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import BookList from './../compponents-template/book-all'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../components-cell/form-text-input'
import FormCustomButton from './../components-cell/form-custom-botton'
import Styles from './style/book-all'
import Themes from './../src/themes/themes'

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
  render() {
    return (
      <View style={Styles.headView}>
        <Icon
          style={Styles.scanIcon}
          name="crop-free"
          size={25}
          color={Themes.color} />
        <TouchableOpacity
          style={Styles.searchView}
          onPress={this._onFocusSearch}>
          <Icon
            name="search"
            size={20} />
          <Text>search</Text>
        </TouchableOpacity>
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
    headerRight:
    <TouchableHighlight>
      <Icon
        style={{ marginRight: 10 }}
        name="dehaze"
        size={20} />
    </TouchableHighlight>
  });

  render() {
    return (
      <BookList navigation={this.props.navigation} />
    );
  }
}



