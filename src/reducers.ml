open Types;;

let make_todo id text complete : todo = [%bs.obj {
  id = id;
  text = text;
  complete = complete;
}]

let state_of_todos todos : state = [%bs.obj {
  todos = todos
}]

let add_todo state text =
  let todos = state##todos in
  Array.append
    todos
    [|
      make_todo (Array.length todos) text false
    |]
  |> state_of_todos

let set_completeness state id complete =
  let todos = state##todos in
  Array.map
    (fun todo ->
       if id = todo##id
       then make_todo id todo##text complete
       else todo
    )
    todos
  |> state_of_todos

let todos : (state -> action -> state) = unfold @@ fun state -> function
  | Add text -> add_todo state text
  | Complete id -> set_completeness state id true
  | Uncomplete id -> set_completeness state id false
