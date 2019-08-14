export const DATA_SUCCESS = "DATA_SUCCESS"
export const DATA_ERROR = "DATA_ERROR"

const initialState = {
    status: "",
    header: "",
    data: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.data,
                status: action.status,
                header: action.header
            })
        case DATA_ERROR:
            return Object.assign({}, state, {
                data: action.error
            })
        default:
            return state
    }
}

function dataError(error) {
    return {
        type: DATA_ERROR,
        error
    }
}

function dataSuccess(status, statusText, data, header = "") {
    return {
        type: DATA_SUCCESS,
        status: `${status} ${statusText}`,
        data,
        header
    }
}

export function getAll() {
    return async (dispatch) => {
        try {
            const response = await fetch(`/api/channels`)
            const res = await response.json()
            dispatch(dataSuccess(response.status, response.statusText, JSON.stringify(res)))
        }catch (err) {
            dispatch(dataError(err))
        }
    }
}

export function get(id) {
    return async (dispatch) => {
        try {
            if(id) {
                const response = await fetch(`/api/channels/${id}`)
                const res = await response.json()
                dispatch(dataSuccess(response.status, response.statusText, JSON.stringify(res)))
            } else {
                dispatch(dataSuccess('Add data first', ''))
            }
        }catch (err) {
            dispatch(dataError(err))
        }
    }
}

export function post(name, num) {
    return async (dispatch) => {
        try {
            const response = await fetch("/api/channels", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    name,
                    num
                })
            })
            dispatch(dataSuccess(response.status, response.statusText))
        }catch (err) {
            dispatch(dataError(err))
        }
    }
}

export function put(id, name, num) {
    return async (dispatch) => {
        try {
            const response = await fetch(`/api/channels/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({
                    name,
                    num
                })
            })
            dispatch(dataSuccess(response.status, response.statusText))
        }catch (err) {
            dispatch(dataError(err))
        }
    }
}

export function del(id) {
    return async (dispatch) => {
        try {
            const response = await fetch(`/api/channels/${id}`, {
                method: "DELETE"
            })
            dispatch(dataSuccess(response.status, response.statusText))
        }catch (err) {
            dispatch(dataError(err))
        }
    }
}