## bs-redux-example

<img src="http://i.imgur.com/N3p0MZ9.png" width="300" alt='A todo list with the title "1 task remaining" and three items. The first, "make a todo list" is checked off. The second, "master ocaml" is not checked off. The third, "publish findings on github" is checked off.' />

This is an experiment in writing [Redux](http://redux.js.org/) reducers for a React app in OCaml with [BuckleScript](https://github.com/bucklescript/bucklescript).

I'm using [nwb](https://github.com/insin/nwb) to run the React app because it's a very handy project.

### Why?

`const ACTION_NAME = "ACTION_NAME"` is a strange pattern, and OCaml datatypes are more expressive than JSON payloads with a "type" field. Also, OCaml match expressions beat switch statements by a mile, and OCaml's type checker can even warn you if your match guards do not provide full coverage.

For these reasons, I hacked together this proof-of-concept as a way to show you that you can use OCaml and JS side-by-side without a heroic amount of effort.

### Run it

```
npm i
npm run build
npm run start
```
