import React from "react"
import ReactDOM from "react-dom"
import App from './component/App'
import channel from './redux/asyncReducer'
import {combineReducers, createStore} from "redux"
import {Provider} from "react-redux"

let  reducer = combineReducers({
    channel
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
