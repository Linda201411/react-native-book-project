import React, { Component } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FormTextInput from '../components-cell/form-text-input'
import BookCategory from './../compponents-template/book-category'
import BookSearchResult from './../compponents-template/book-search-result'
import storage from 'store2';
import Styles from './style/book-search'

class BookSearchText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: ''
    };
  }
  componentWillMount() {
     var BookName = storage.session('BookName');
     this.setState({
       bookName: BookName == null ? "" : BookName
     });
  }
  _onChangeText = (val) => {
    this.setState({
      bookName: val
    });
  }
  _onClearText=()=>{
    this.setState({
      bookName: ""
    });
  }
  render() {
    storage.session('BookName', this.state.bookName);
    return (
      <View style={Styles.search}>
        <FormTextInput
          value={this.state.bookName}
          style={Styles.searchText}
          onChangeText={(val) => this._onChangeText(val)}
          placeholder='search'></FormTextInput>
          <TouchableOpacity style={Styles.clearView} 
          onPress={this._onClearText}>
            <Icon name="clear"
                  size={25} />
          </TouchableOpacity>
      </View>
    );
  }
}

class BookSearchButton extends Component {
  _onSearchBook = () => {
    const { navigate } = this.props.navigation;
    navigate('Main');
  }
  render() {
    return (
      <TouchableOpacity
        style={Styles.buttonView}
        activeOpacity={.5}
        onPress={this._onSearchBook}>
        <View style={Styles.button}>
          <Text style={Styles.buttonText}>搜索</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <BookSearchText />,
    headerRight: <BookSearchButton navigation={navigation} />
  });
  render() {
    return (
      <BookCategory navigation={this.props.navigation} />
    );
  }
}



