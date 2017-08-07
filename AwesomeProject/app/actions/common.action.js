export function changeData() {
    return {
        type: 'CHANGE_DATA',
        payload: {
            val: new Date().getUTCMilliseconds()
        }
    }
}

export function changeEditStatus() {
    return {
        type: 'CHANGE_EDITSTATUS',
        payload: {
            val: new Date().getUTCMilliseconds()
        }
    }
}

export function resetEditStatus() {
    return {
        type: 'RESET_EDITSTATUS',
        payload: {
            val: new Date().getUTCMilliseconds()
        }
    }
}