import React, { Component } from "react"
import { connect } from "react-redux"

import { add, complete, uncomplete } from "../lib/js/src/actions.js"

const Todo = props =>
    <div>
        <label>
            <input
                type="checkbox"
                checked={props.complete}
                onChange={() =>
                    props.dispatch(
                        props.complete
                            ? uncomplete(props.id)
                            : complete(props.id)
                    )}
            />

            <span
                style={{
                    textDecoration: props.complete ? "line-through" : "none",
                }}
            >
                {props.text}
            </span>
        </label>
    </div>

class App extends Component {
    onSubmit = e => {
        e.preventDefault()
        this.props.dispatch(add(this.input.value))
        this.input.value = ""
    }

    render() {
        const { todos, dispatch } = this.props
        const unfinishedCount = todos.filter(todo => !todo.complete).length

        return (
            <main>
                <h1>
                    {unfinishedCount === 1
                        ? "1 task remaining"
                        : `${unfinishedCount} tasks remaining`}
                </h1>

                {todos.map(todo =>
                    <Todo key={todo.id} dispatch={dispatch} {...todo} />
                )}

                <form onSubmit={this.onSubmit}>
                    <label>
                        New item: <input ref={node => (this.input = node)} />
                    </label>
                </form>
            </main>
        )
    }
}

export default connect(state => state)(App)
