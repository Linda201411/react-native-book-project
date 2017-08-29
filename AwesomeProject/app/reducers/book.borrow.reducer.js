export default function reducer(state = {
    BookBorrowList: [],
    Opearation: {},
    bookBorrowModel:{
        checkedAll:false,
        checkCount:0,
        dataList:[]
    },
}, action) {
    switch (action.type) {
        case 'GET_BOOK_BORROW_LIST':
            return {
                ...state,
                bookBorrowModel: {
                    checkedAll: action.payload.checkedAll,
                    checkCount: action.payload.checkCount,
                    dataList: action.payload.dataList
                }
            }
        case 'SELECT_ALL_BOOK_LIST':
            return {
                ...state,
                bookBorrowModel:{
                    checkedAll: action.payload.checkedAll,
                    dataList: action.payload.dataList
                },
            }
        case 'UNSELECT_ALL_BOOK_LIST':
            return {
                ...state,
                BookBorrowList: action.payload
            }
        default:
            return state;
    }
}