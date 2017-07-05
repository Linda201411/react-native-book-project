import {TabNavigator} from 'react-navigation'
import BookAll from './book-all';
import BookBorrow from './../compponents-template/book-borrow';
import BookHistory from './../compponents-template/borrow-history';
import BookCollection from './../compponents-template/book-collection';
import UserInfo from './../compponents-template/users-info';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './../compponents-template/login'

const MenuBottom = TabNavigator({
  BookAll: {
    screen: BookAll,
  },
  BookBorrow: {
    screen: BookBorrow,
  },
  BookHistory: {
    screen: BookHistory,
  },
  BookCollection: {
    screen: BookCollection,
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
        fontWeight:'bold'
    },
    style: {
        backgroundColor: '#43A047',
    },
  },
  tabBarPosition: 'bottom'
});

export default MenuBottom;

