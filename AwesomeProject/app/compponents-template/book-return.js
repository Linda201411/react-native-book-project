import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    ScrollView,
    TouchableHighlight,
    Alert,
    TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux';
import { GetBookBorrowListByUserId, BookReturnList } from '../actions/book.return.action'
import { selectALL, unSelectALL } from '../actions/book.borrow.action';
import BookOperation from '../components-cell/book-operation';
import { getPermission } from '../actions/account.action'
import Styles from './style/book-return'
import { changeData } from '../actions/common.action'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import BookNoData from './../components-cell/book-nodata'
import BookItem from './../components-cell/book-return-item'

@connect((store) => {
    return {
        BookReturnListByUserId: store.bookReturnReducer.BookReturnListByUserId,
        permission: store.accountReducer.permission,
        Flag: store.commonReducer.Flag
    }
})

export default class BookReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedAll: false,
            sum: 0,
            disable: true
        };
    }
    // componentWillMount() {
    //     this.props.dispatch(GetBookBorrowListByUserId(this.props.permission.UserName));
    // }
    componentWillReceiveProps(nextProps) {
        if (this.props.Flag !== nextProps.Flag) {
            this.setState({
                checkedAll: false,
                sum: 0
            });
            this.props.dispatch(GetBookBorrowListByUserId(this.props.permission.UserName));
        }
    }
    _onCheck = (data) => {
        data.isCheck = !data.isCheck;
        if (data.isCheck) {
            this.setState({
                sum: this.state.sum + 1,
                disable: false
            });
        } else {
            this.setState({
                sum: this.state.sum - 1,
                disable: this.state.sum == 1 ? true : false
            });
        }
    }
    _onCheckAll = () => {
        if (!this.state.checkedAll) {
            this.setState({
                checkedAll: true,
                disable: false,
                sum: this.props.BookReturnListByUserId.length
            })
            this.props.dispatch(selectALL(this.props.BookReturnListByUserId));
        } else {
            this.setState({
                checkedAll: false,
                disable: false,
                sum: 0
            });
            this.props.dispatch(unSelectALL(this.props.BookReturnListByUserId));
        }
    }
    _onReturnBook = () => {
        var BookReturnModelList = this.props.BookReturnListByUserId.filter(x => x.isCheck == true);
        if (BookReturnModelList.length < 1) {
            Toast.info('请选择要还的图书!', 1);
            return;
        }
        var data = {
            BookReturnModelList: BookReturnModelList,
        }
        Alert.alert('',
            "确定要还书吗？",
            [
                { text: '取消', onPress: console.log("取消") },
                {
                    text: '继续', onPress: () => {
                        BookReturnList(data).then(() => {
                            Toast.success('还书成功', 1);
                            this.props.dispatch(changeData());
                            this.setState({
                                checkedAll: false,
                                sum: 0
                            });
                        });
                    }
                },
            ],
            { cancelable: false }
        )
    }
    _preventClickTwice() {
        this.setState({ disable: true });
        setTimeout(() => { this.setState({ disable: false }) }, 2000)
    }
    _showDetailBook = (id, CanOrder) => {
        this._preventClickTwice();
        const { navigate } = this.props.navigation;
        navigate('BookDetail', { id: id, CanOrder: CanOrder })
    }
    render() {
        return (
            <View style={Styles.return}>
                <ScrollView>
                    <View style={Styles.container}>
                        {
                            this.props.BookReturnListByUserId.length > 0 ?
                                <View>
                                    {
                                        this.props.BookReturnListByUserId.map((val) => {
                                            return <BookItem
                                                onShowDetail={() => this._showDetailBook(val.BookId, false)}
                                                onSelect={() => this._onCheck(val)}
                                                data={val} />
                                        })
                                    }
                                </View>
                                :
                                <BookNoData />
                        }
                    </View>
                </ScrollView>
                <BookOperation
                    isCheckAll={this.state.checkedAll}
                    total={this.state.sum}
                    onCheckAll={this._onCheckAll}
                    disabled={this.state.disable}
                    onBorrowBook={this._onReturnBook}
                    lableColor={"#E65100"}
                    lable={'还书'} />
            </View>
        );
    }
}



