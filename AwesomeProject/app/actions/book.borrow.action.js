import thaxios from '../unilities/axios';

export function getBookBorrowList(obj) {
    return function (dispatch) {
        thaxios({
            url: 'collect/getCollectList?UserName=' + obj,
            method: 'GET'
        }).then((res) => {
            dispatch({
                type: 'GET_BOOK_BORROW_LIST',
                payload: {
                    dataList:res.Datas,
                    checkCount:0,
                    checkedAll:true
                }
            })
        });
    }
}

export function BookBorrowList(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'collect/borrowBook',
            method: 'POST',
            data: obj
        }).then((res) => {
            dispatch({
                result: res
            })
        });
    });
}

export function RemoveBookBorrowList(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'collect/deleteByIds',
            method: "POST",
            data: obj
        }).then((res) => {
            dispatch({
                result: res
            })
        })
    })
}

export function SureBorrowBook(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'collect/sureBorrowBook',
            method: 'POST',
            data: obj
        }).then((res) => {
            dispatch({
                result: res
            })
        });
    });
}

export function selectALL(datas) {
    debugger;

    datas = datas.map(function (item, index) {
        item.isCheck = true;
        return item;
    });
    return {
        type: 'SELECT_ALL_BOOK_LIST',
        payload: {
            dataList:datas,
            checkedAll:true
        }
    }
}



export function unSelectALL(datas) {
    datas = datas.map(function (item, index) {
        item.isCheck = false;
        return item;
    });
    return {
        type: 'UNSELECT_ALL_BOOK_LIST',
        payload: datas
    }
}
