import React, { Component } from "react"
import { connect } from "react-redux"

import { increment, decrement, reset } from "../lib/js/src/actions.js"

export default connect(state => state)(({ count, dispatch }) =>
    <main>
        <h1>
            Count: {count}
        </h1>

        <button onClick={() => dispatch(increment(1))}>Increment</button>
        <button onClick={() => dispatch(decrement(1))}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
    </main>
)
