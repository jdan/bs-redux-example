type action_type =
  | Reset
  | Increment of int
  | Decrement of int

type state = < count: int > Js.t
type action = < _type: string; value: action_type > Js.t

let unfold reducer (state: state) (action: action) =
  reducer state action##value
