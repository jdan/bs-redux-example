type action_type =
  | Add of string
  | Complete of int
  | Uncomplete of int

type todo = < id : int; text : string; complete : bool > Js.t
type state = < todos: todo array > Js.t
type action = < _type: string; value: action_type > Js.t

let unfold reducer (state: state) (action: action) =
  reducer state action##value
