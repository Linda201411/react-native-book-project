import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux';
import { getBookList, borrowBook, collectBook } from '../actions/book.action';
import { GetBookBorrowListByUserId } from '../actions/book.return.action'
import storage from 'store2';
import { changeData } from '../actions/common.action'
import { getPermission } from '../actions/account.action'
import Styles from './style/book-all'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import BookNoData from './../components-cell/book-nodata'
import BookItem from './../components-cell/book-all-item'
import Modal from 'react-native-modal'
import FormCustomButton from './../components-cell/form-custom-botton'
import BookModal from './../components-cell/show-modal'


@connect((store) => {
  return {
    BookList: store.bookReducer.BookList,
    BooKlistTotalPage: store.bookReducer.BooKlistTotalPage,
    Flag: store.commonReducer.Flag,
    permission: store.accountReducer.permission,
    OverTimeCount: store.bookReturnReducer.OverTimeCount,
    initIndex: store.commonReducer.initIndex
  }
})

export default class BookAll extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isRefreshing: false,
      currentPage: 1,
      NoMoreData: false,
      disable: false,
      isModalVisible: true,
      isProgressVisible: true
    };
  }
  componentWillMount() {
    this.props.dispatch(GetBookBorrowListByUserId(this.props.permission.UserName));
  }
  componentDidMount() {
    this._search();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.initIndex == 1 && this.props.initIndex != nextProps.initIndex) {
      this._search();
    }
  }
  _search = (page) => {
    var BookName = storage.session('BookName');
    var CategoryId = storage.session('CategoryId');
    var data = {
      UserName: this.props.permission.UserName,
      BookName: BookName == null ? "" : BookName,
      CategoryId: CategoryId == null ? 0 : CategoryId,
      Page: page ? page : 1
    };
    getBookList(data).then((res) => {
      const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
      var dataSource = ds.cloneWithRows(res.payload);
      this.props.dispatch({
        type: 'GET_BOOK_LIST',
        payload: res.payload,
        pageTotal: res.pageTotal
      })
      this.setState({
        dataSource: dataSource,
        NoMoreData: false,
        currentPage: 1
      })
    });
  }
  _addBook = () => {
    const { navigate } = this.props.navigation;
    navigate('BookAdd')
  }
  _collectBook = (val) => {
    if (!val.CanOrder) {
      return;
    }
    var data = {
      BookCollectionModel: {
        BookId: val.Id,
        UserName: this.props.permission.UserName,
        CollectionDate: new Date()
      }
    };
    collectBook(data).then(() => {
      Toast.success('添加到借阅单成功', 1);
      this.props.dispatch(changeData());
    });
  }
  _showDetailBook = (id, CanOrder) => {
    const { navigate } = this.props.navigation;
    navigate('BookDetail', { id: id, CanOrder: CanOrder, UserName: this.props.permission.UserName })
  }
  _onRefresh = () => {
    this._search();
  }
  _onEndReached = () => {
    if (this.state.currentPage < this.props.BooKlistTotalPage - 1) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 })
      } else {
        page = this.state.currentPage + 1
      }
      var BookName = storage.session('BookName');
      var CategoryId = storage.session('CategoryId');
      var data = {
        UserName: this.props.permission.UserName,
        BookName: BookName == null ? "" : BookName,
        CategoryId: CategoryId == null ? 0 : CategoryId,
        Page: page
      };
      getBookList(data).then((res) => {
        const data = this.props.BookList;
        const newData = res.payload;
        newData.map((item, index) => data.push(item));
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.BookList)
        });
      });
    } else {
      this.setState({
        NoMoreData: true
      })
    }
  }
  _renderRow(rowData) {
    return <BookItem
      onShowDetail={() => this._showDetailBook(rowData.Id, rowData.CanOrder)}
      onSelect={() => this._collectBook(rowData)}
      data={rowData} />
  }
  _onClose = () => {
    this.setState({
      isModalVisible: false
    });
  }
  _toBookReturn = () => {
    this._onClose();
    const { navigate } = this.props.navigation;
    navigate('BookReturn')
  }
  render() {
    return (
      <View style={Styles.all}>
        <BookModal
          OverTimeCount={this.props.OverTimeCount}
          isVisible={this.state.isModalVisible}
          onClose={this._onClose}
          ToBookReturn={this._toBookReturn} />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={() =>
            <View style={Styles.bookFooter}>
              {this.state.NoMoreData ?
                <View style={Styles.noBookView} >
                  <Text style={Styles.noBookText} >没有图书啦。。。</Text></View>
                :
                <View />}
            </View>
          }
          onEndReached={this._onEndReached}
          onEndReachedThreshold={10}
          enableEmptySections={true}
          pageSize={10}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              colors={['#EA0000']}
              tintColor="white"
              title="loading..."
              titleColor="white"
              progressBackgroundColor="white"
            />
          }
        />
      </View>
    );
  }
}

const ProgressBar = () => (
  <View style={{
    flex: 1, justifyContent: 'center'
  }}>
    <ActivityIndicator size="large" color={"#EA0000"} />
  </View>
);