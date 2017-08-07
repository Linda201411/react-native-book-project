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
import { getBookBorrowList, BookBorrowList, selectALL, unSelectALL, SureBorrowBook, RemoveBookBorrowList } from '../actions/book.borrow.action'
import { getPermission } from '../actions/account.action'
import BookOperation from './../components-cell/book-operation'
import { changeData } from '../actions/common.action'
import Styles from './style/book-borrow'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import BookNoData from './../components-cell/book-nodata'
import BookItem from './../components-cell/book-borrow-item'
import storage from 'store2';
import RNBottomSheet from 'react-native-bottom-sheet';
import { changeEditStatus, resetEditStatus } from '../actions/common.action'
@connect((store) => {
  return {
    BookBorrowList: store.bookBorrowReducer.BookBorrowList,
    Opearation: store.bookBorrowReducer.Opearation,
    permission: store.accountReducer.permission,
    Flag: store.commonReducer.Flag,
    EditStatus: store.commonReducer.EditStatus,
    ResetStatus: store.commonReducer.ResetStatus,
  }
})

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAll: false,
      sum: 0,
      disable: true,
      isEdit: false
    };
  }
  componentWillMount() {
    this.props.dispatch(getBookBorrowList(this.props.permission.UserName));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.Flag !== nextProps.Flag) {
      this.props.dispatch(getBookBorrowList(this.props.permission.UserName));
      this.setState({
        checkedAll: false,
        sum: 0,
      });
    }

    if (this.props.EditStatus !== nextProps.EditStatus) {
      this.setState({
        isEdit: !this.state.isEdit
      })
    }
    if (this.props.ResetStatus !== nextProps.ResetStatus) {
      this.setState({
        isEdit: false,
      })
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
    this.setState({
      checkedAll: !this.state.checkedAll
    });
    if (!this.state.checkedAll) {//select all
      this.setState({
        sum: this.props.BookBorrowList.length,
        disable: false
      });
      this.props.dispatch(selectALL(this.props.BookBorrowList));
    } else {
      this.setState({//select all
        sum: 0,
        disable: true
      });
      this.props.dispatch(unSelectALL(this.props.BookBorrowList));
    }
  }
  _onBorrowBook = () => {
    if (!this.state.isEdit) {
      let BookCollectionList = this.props.BookBorrowList.filter(x => x.isCheck == true);
      if (BookCollectionList.length < 1) {
        Toast.info('请选择要借阅的图书!', 1);
        return;
      }

      let data = {
        BookCollectionList: BookCollectionList,
        UserName: this.props.permission.UserName,
        BorrowDate: new Date()
      }
      Alert.alert('',
        "确定要借书吗？",
        [
          { text: '取消', onPress: console.log("取消") },
          {
            text: '继续', onPress: () => {
              BookBorrowList(data).then((res) => {
                if (res.result.Status == 1) {
                  Toast.success('借阅成功,请于30天内归还此书', 1);
                  this.props.dispatch(changeData());
                  this._cancelBorrow();
                } else {
                  Alert.alert('',
                    res.result.Message,
                    [
                      { text: '取消', onPress: this._cancelBorrow },
                      { text: '继续', onPress: () => this._sureBorow(data) },
                    ],
                    { cancelable: false }
                  )
                }
              });
            }
          },
        ],
        { cancelable: false }
      )
    } else {
      let BookCollectionRemoveList = this.props.BookBorrowList.filter(x => x.isCheck == true);
      if (BookCollectionRemoveList.length < 1) {
        Toast.info('请选择要删除的图书!', 1);
        return;
      }
      let data = {
        Ids: BookCollectionRemoveList.map((val) => val.Id),
      }
      Alert.alert('',
        "确定要删除吗？",
        [
          { text: '取消', onPress: console.log("取消") },
          {
            text: '继续', onPress: () => {
              RemoveBookBorrowList(data).then((res) => {
                Toast.success('删除成功', 1);
                this.props.dispatch(changeData())
                this.props.dispatch(resetEditStatus());
              })
            }
          },
        ],
        { cancelable: false }
      )
    }


  }
  _cancelBorrow = () => {
    this.props.dispatch(unSelectALL(this.props.BookBorrowList));
    this.setState({
      checkedAll: false,
      sum: 0
    });
  }
  _sureBorow = (data) => {
    SureBorrowBook(data).then((res) => {
      Alert.alert('', res.result.Message, [], { cancelable: true });
      this.props.dispatch(changeData());
      this._cancelBorrow();
    });
  }
  _showDetailBook = (id, CanOrder) => {
    const { navigate } = this.props.navigation;
    navigate('BookDetail', { id: id, CanOrder: CanOrder })
  }
  _removeItem = (Id) => {
    RNBottomSheet.showBottomSheetWithOptions({
      options: ['删除', '取消'],
      title: '测试标题',
      message: '测试内容',
      cancelButtonIndex: 1,
    }, (value) => {
      if (value === 0) {
        Alert.alert('',
          "确定要删除吗？",
          [
            { text: '取消', onPress: console.log("取消") },
            {
              text: '继续', onPress: () => {
                let Ids = [];
                Ids.push(Id);
                let data = {
                  Ids: Ids
                }
                RemoveBookBorrowList(data).then((res) => {
                  Toast.success('删除成功', 1);
                  this.props.dispatch(changeData());
                })
              }
            },
          ],
          { cancelable: false }
        )
      }
    })
  }

  render() {
    return (
      <View style={Styles.borrow}>
        <ScrollView>
          <View style={Styles.container}>
            {
              this.props.BookBorrowList.length > 0 ?
                <View>
                  {
                    this.props.BookBorrowList.map((val) => {
                      return <BookItem
                        onRemoveItem={() => this._removeItem(val.Id)}
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
          onBorrowBook={this._onBorrowBook}
          lableColor={!this.state.isEdit ? "#E65100" : "#F50057"}
          lable={this.state.isEdit ? "删除" : "借阅"}
        />
      </View>
    );
  }
}


