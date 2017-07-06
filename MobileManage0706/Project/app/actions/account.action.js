import thaxios from '../unilities/axios';
import storage from 'store2';
import validator from 'validator';
import { View, StyleSheet, AsyncStorage } from 'react-native';
// export function AccountLogin(obj) {
//     return new Promise(function (dispatch) {
//         thaxios({
//             url: 'account/login',
//             method: 'POST',
//             data: obj
//         }).then((res) => {
//             storage.set('RoleId', res.Data.RoleId);
//             dispatch({
//                 type: 'USER_LOGIN',
//                 payload: res.Data
//             })
//         });
//     }
// }

export function AccountLogin(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'account/login',
            method: 'POST',
            data: obj
        }).then((res) => {
            //storage.set('RoleId', res.Data.RoleId);
            AsyncStorage.setItem("myKey", res.Data.RoleId);
            dispatch({
                type: 'USER_LOGIN',
                payload: res.Data
            })
        });
    });
}



export function editEmail(val) {
    return {
        type: 'EDIT_EMAIL',
        payload: {
            val: val,
            isEmail: validator.isEmail(val)
        }
    }
}

export function editPassword(val) {
    return {
        type: 'EDIT_PASSWORD',
        payload: {
            val: val,
            isPassword: !validator.isEmpty(val)
        }
    }
};