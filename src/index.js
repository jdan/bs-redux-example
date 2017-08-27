import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { compose, createStore, applyMiddleware } from "redux"

import App from "./App.js"
import { counter } from "../lib/js/src/reducers.js"
import { init } from "../lib/js/src/actions.js"

function wrapInit(reducer) {
    return (state, action) => {
        if (action.type === "@@redux/INIT") {
            return state
        }
        return reducer(state, action)
    }
}

function tag() {
    return next => action => {
        next({
            // Should prob get the type from action's tag?
            type: `tagged_${action.tag}`,
            value: action,
        })
    }
}

const store = createStore(
    wrapInit(counter),
    {
        count: 0,
    },
    applyMiddleware(tag)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)
