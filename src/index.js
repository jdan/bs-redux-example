import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { compose, createStore, applyMiddleware } from "redux"

import App from "./App.js"
import { todos } from "../lib/js/src/reducers.js"
import { init } from "../lib/js/src/actions.js"

/**
 * Hacks to make this work with OCaml :)
 *
 * Below are two functions `wrapInit`, which wraps are reducer,
 * and `tag`, which is used as a middleware.
 */

/**
 * Wrap our reducer which is incompatible with the `@@redux/INIT`
 * magic action.
 *
 * Why? Because our reducers work only on our type for `action_type`
 * (see types.ml), which is defined to be
 *    Add of text | Complete of int | Uncomplete of int
 *
 * Even if we provide a "default" case for our reducer's `match`, there
 * is no way to get the compiled JS code to handle an arbitrary `action`.
 *
 * BuckleScript knows we want an `action_type`, and will `switch` ONLY
 * for that type! Not a string like `@@redux/INIT`.
 */
function wrapInit(reducer) {
  return (state, action) => {
    if (action.type === "@@redux/INIT") {
      return state
    }
    return reducer(state, action)
  }
}

/**
 * Our action creators and reducers work on `action_type`s, and NOT
 * json objects.
 *
 * Redux only allows us to dispatch objects, so `tag` will create
 * objects for us! `unfold` (see types.ml) will extract the `action_type`.
 */
function tag() {
  return next => action => {
    next({
      type: `tagged_${action.tag}`,
      value: action,
    })
  }
}

const store = createStore(
  wrapInit(todos),
  {
    todos: [],
  },
  applyMiddleware(tag)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)
