import thaxios from '../unilities/axios';
import storage from 'store2';

export function getBookList(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'book/getList',
            method: 'POST',
            data: obj
        }).then((res) => {
            storage.session('CategoryId', 0);
            dispatch({
                type: 'GET_BOOK_LIST',
                payload: res.Datas,
                pageTotal: res.Total
            })
        });
    })
}

export function getBookCategoryList(obj) {
    return function (dispatch) {
        thaxios({
            url: 'category/getList',
            method: 'GET',
            params: obj,
            hideGlobalLoading: true
        }).then((res) => {
            res.Datas = res.Datas.map(function (item, index) {
                return {
                    key: index,
                    label: item.Name,
                    Name: item.Name,
                    Id: item.Id
                }
            });
            dispatch({
                type: 'GET_BOOK_CATEGORY_LIST',
                payload: res.Datas
            })
        });
    }
}

export function addBookInfo(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'book/addOrUpdate',
            method: 'Post',
            data: obj
        }).then((res) => {
            dispatch({
                type: 'ADD_BOOKINFO',
                payload: res.Datas
            })
        });
    });
}

export function collectBook(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'book/collectBook',
            method: 'Post',
            data: obj
        }).then((res) => {
            dispatch({
                type: 'BOOK_COLLECT',
                payload: res
            })
        });
    });
}

export function backBook(obj) {
    return new Promise(function (dispatch) {
        thaxios({
            url: 'book/backBook',
            method: 'Post',
            data: obj
        });
    });
}

export function VerifyBookName(val, BookList) {
    var BookNameError = '';
    if (!val) {
        BookNameError = 'Book name is Required'
    }
    if (BookList) {
        var duplicatedName = BookList.filter((item) => {
            return item.BookName === val;
        })
        if (duplicatedName.length !== 0) {
            BookNameError = 'This name is already taken.'
        }
    }

    return {
        type: 'VERYFY_BOOKNAME',
        payload: {
            val: val,
            BookNameError: BookNameError
        }
    }
}

export function VerifyAuthor(val) {
    var AuthorError = '';
    if (!val) {
        AuthorError = 'Author is Required'
    }
    return {
        type: 'VERYFY_AUTHOR',
        payload: {
            val: val,
            AuthorError: AuthorError
        }
    }
}

export function VerifyCategory(val) {
    var CategoryIDError = '';
    if (!val || val == null) {
        CategoryIDError = 'You must select a category for this book.'
    }
    return {
        type: 'VERYFY_CATEGORYID',
        payload: {
            val: val,
            CategoryIDError: CategoryIDError
        }
    }
}

export function editRemark(val) {
    return {
        type: "EDIT_REMARK",
        payload: {
            val: val,
        }
    }
}

export function editPublicAddress(val) {
    return {
        type: "EDIT_PUBLICADDRESS",
        payload: {
            val: val,
        }
    }
}

export function editDate(val) {
    return {
        type: "EDIT_DATE",
        payload: {
            val: val,
        }
    }

}

export function clearBook(val) {
    return {
        type: "CLEAR",
        payload: {
            val: val,
        }
    }
}