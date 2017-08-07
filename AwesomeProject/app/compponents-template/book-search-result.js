import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    AsyncStorage,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux';
import { getBookCategoryList } from '../actions/book.action';
import FormButton from './../components-cell/form-button'
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from 'store2';
import Styles from './style/book-category'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

@connect((store) => {
    return {
        BookCategoryList: store.bookReducer.BookCategoryList
    }
})

export default class BookSearchResult extends Component {
    componentWillMount() {
        this.props.dispatch(getBookCategoryList());
    }
    _onSelectCategory = (id) => {
        storage.session('CategoryId', id);
        const { navigate } = this.props.navigation;
        navigate('Main');
    }
    render() {
        return (
            <ScrollView>
                {
                    this.props.BookCategoryList.map((val) => {
                        return <TouchableOpacity
                            key={val.Id}
                            activeOpacity={.5}
                            onPress={() => this._onSelectCategory(val.Id)}>
                            <View style={Styles.item}>
                                <View style={Styles.button}>
                                    <Text style={Styles.buttonText}>{val.Name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        );
    }
}
