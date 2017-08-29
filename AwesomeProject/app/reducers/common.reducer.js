export default function reducer(state = {
    Flag: 0,
    EditStatus: 0,
    ResetStatus: 0,
    initIndex: 0,
}, action) {
    switch (action.type) {
        case 'CHANGE_DATA':
            return {
                ...state,
                Flag: action.payload.val
            }
        case 'INIT_DATA':
            return {
                ...state,
                initIndex: action.payload
            }
        case 'EXIST_APP':
            return {
                ...state,
                globalCount: action.payload.val
            }
        case 'CHANGE_EDITSTATUS':
            return {
                ...state,
                EditStatus: action.payload.val
            }
        case 'RESET_EDITSTATUS':
            return {
                ...state,
                ResetStatus: action.payload.val
            }
        default:
            return state;
    }
}