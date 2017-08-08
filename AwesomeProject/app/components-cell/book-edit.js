import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import BookList from './../compponents-template/book-borrow'
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from 'store2';
import { connect } from 'react-redux';
import { changeEditStatus } from '../actions/common.action'
@connect((store) => {
    return {
        EditStatus: store.commonReducer.EditStatus,
        ResetStatus: store.commonReducer.ResetStatus,
    }
})


export default class EditText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            text: '编辑',
        };
        storage.session('isEdit', this.state.isEdit);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.ResetStatus !== nextProps.ResetStatus) {
            this.setState({
                isEdit: false,
                text: '编辑',
            })
        }
    }

    _changeEdit = () => {
        if (this.state.isEdit) {
            this.setState({
                isEdit: false,
                text: '编辑'
            });
            storage.session('isEdit', this.state.isEdit);
            this.props.dispatch(changeEditStatus());
        } else {
            this.setState({
                isEdit: true,
                text: '完成'
            });
            storage.session('isEdit', this.state.isEdit);
            this.props.dispatch(changeEditStatus());
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={this._changeEdit}>
                <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, paddingRight: 10 }} >{this.state.text}</Text>
            </TouchableOpacity>
        )
    }
}