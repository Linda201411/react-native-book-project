import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import MainScreen from './screens/main-screen';
import AdminMainScreen from './screens/admin-main-screen';
import AccountScreen from './screens/account-screen';
import BookAddScreen from './screens/book-add-screen';
import BookDetailScreen from './screens/book-detail-screen';
import SearchScreen from './screens/book-search-screen';
import AppIntroScreen from './screens/appIntro-screen';
import BookAboutScreen from './screens/book-about-screen';
import { connect } from 'react-redux'
import { getPermission, checkViewIntro } from './actions/account.action'
import { SureToExistApp } from './actions/common.action'
import TakePhoto from './compponents-template/take-photo';
import BookSearchResultScreen from './screens/book-search-result-screen';

@connect((store) => {
  return {
    permission: store.accountReducer.permission,
    globalCount: store.commonReducer.globalCount
  }
})

export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthened: false,
    };
  }
  componentWillMount() {
    this.props.dispatch(getPermission());
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthened: nextProps.permission.IsAuthened,
      IsAdmin: nextProps.permission.RoleId === 1
    });
  }
  render() {
    const RouteItem = CreateRootNavigator(this.state.isAuthened, this.state.IsAdmin);
    return (
      <RouteItem />
    );
  }
}
const CreateRootNavigator = (IsAuthened = true, IsAdmin) => {
  var initialRouteName = 'Main';
  if (IsAuthened) {
    initialRouteName = 'Main'
  } else {
    initialRouteName = 'Account'
  }

  return StackNavigator({
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: MainScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    AdminMain: {
      screen: AdminMainScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    AppIntro: {
      screen: AppIntroScreen,
      navigationOptions: {
        header: null
      }
    },
    BookAdd: {
      screen: BookAddScreen
    },
    BookDetail: {
      screen: BookDetailScreen
    },
    Search: {
      screen: SearchScreen
    },
    BookAboutScreen: {
      screen: BookAboutScreen
    },
    TakePhoto: {
      screen: TakePhoto
    },
    BookSearchResultScreen: {
      screen: BookSearchResultScreen
    }
  }, {
      cardStyle: {
        backgroundColor: 'white'
      },
      initialRouteName: initialRouteName,
    });
}



