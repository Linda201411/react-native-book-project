import React, { Component } from 'react';
import { AsyncStorage, View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import { TabNavigator } from 'react-navigation'
import BookAll from './book-all';
import BookBorrow from './book-borrow';
import BookHistory from './borrow-history';
import BookCollection from './book-collection';
import BookReturn from './book-return';
import UserInfo from './user-info';
import SystemManage from './system-manage';
import Themes from './../src/themes/themes'
import {changeData} from './../actions/common.action'

const styles = StyleSheet.create({
  tabbar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.color,
  },
  tab: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class TabBar extends Component {
  constructor(props) {
    super(props);
  }
  _onChangeTab = (index) => {
    this.props.jumpToIndex(index);
  }
  render() {
    const {
      navigation,
      renderIcon,
      jumpToIndex
    } = this.props;

    const {
      routes
    } = navigation.state;

    return (
      <View style={styles.tabbar}>
        {routes && routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const tintColor = focused ? '#EEFF41' : 'white';
          return (
            <TouchableWithoutFeedback
              key={route.key}
              style={styles.tab}
              onPress={() => this._onChangeTab(index)}
            >
              <View style={styles.tab}>
                {renderIcon({
                  route,
                  index,
                  focused,
                  tintColor
                })}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
};

const MainScreen = TabNavigator({
  BookAll: {
    screen: BookAll,
  },
  BookBorrow: {
    screen: BookBorrow,
  },
  // BookHistory: {
  //   screen: BookHistory,
  // },
  BookReturn: {
    screen: BookReturn,
  },
  UserInfo: {
    screen: UserInfo,
  },
  // SystemManage: {
  //   screen: SystemManage
  // }
}, {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarComponent: TabBar,
    swipeEnabled: false
  });

export default MainScreen;
