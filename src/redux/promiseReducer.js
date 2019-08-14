const DATA_REQUEST = "DATA_REQUEST";
const DATA_RECEIVE = "DATA_RECEIVE";
const DATA_ERROR = "DATA_ERROR";
const DATA_SUCCESS = "DATA_SUCCESS";

const initialState = {
    status: "",
    header: "",
    data: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_REQUEST:
            return Object.assign({}, state, {
                data: "data request"
            });
        case DATA_RECEIVE:
            return Object.assign({}, state, {
                data: "data receive",
                status: action.status,
                header: action.header
            });
        case DATA_ERROR:
            return Object.assign({}, state, {
                data: action.error
            });
        case DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.response
            });
        default:
            return state;
    }
};

function dataRequest() {
    return {
        type: DATA_REQUEST
    };
}

function dataReceive(status, statusText, header = "") {
    return {
        type: DATA_RECEIVE,
        status: `${status} ${statusText}`,
        header
    };
}

function dataError(error) {
    return {
        type: DATA_ERROR,
        error
    };
}

function dataSuccess(response) {
    return {
        type: DATA_SUCCESS,
        response
    };
}

export function get(id) {
    return dispatch => {
        dispatch(dataRequest());
        return fetch(`/api/users/${id}`)
            .then(res =>  {
                dispatch(dataReceive(res.status, res.statusText));
                return res.text();
            })
            .then(res => dispatch(dataSuccess(res)))
            .catch(err => dispatch(dataError(err)));
    };
}

export function post(name, age) {
    return dispatch => {
        dispatch(dataRequest());
        return fetch("/api/users", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name,
                age
            })
        })
            .then(res => {
                dispatch(dataReceive(
                    res.status,
                    res.statusText,
                    res.headers.get("Location")
                ));
                return res.text();
            })
            .then(res => dispatch(dataSuccess(res)))
            .catch(err => dispatch(dataError(err)));
    };
}

export function put(id, name, age) {
    return dispatch => {
        dispatch(dataRequest());
        return fetch(`/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({
                name,
                age
            })
        })
            .then(res =>  {
                dispatch(dataReceive(res.status, res.statusText));
                return res.text();
            })
            .then(res => dispatch(dataSuccess(res)))
            .catch(err => dispatch(dataError(err)));
    };
}

export function del(id) {
    return dispatch => {
        dispatch(dataRequest());
        return fetch(`/api/users/${id}`, {
            method: "DELETE"
        })
            .then(res =>  {
                dispatch(dataReceive(res.status, res.statusText));
                return res.text();
            })
            .then(res => dispatch(dataSuccess(res)))
            .catch(err => dispatch(dataError(err)));
    };
}