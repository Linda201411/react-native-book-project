export function changeData() {
    return {
        type: 'CHANGE_DATA',
        payload: {
            val: new Date().getUTCMilliseconds()
        }
    }
}

export function initData() {
    return {
        type: 'INIT_DATA',
        payload: {
            globalCount: 1
        }
    }
}

export function SureToExistApp() {
    return {
        type: 'EXIST_APP',
        payload: {
            globalCount: 0
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