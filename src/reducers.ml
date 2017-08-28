open Types;;

let make_todo id text complete = [%bs.obj {
  id = id;
  text = text;
  complete = complete;
}]

let object_of_todos todos = [%bs.obj {
  todos = todos
}]

let add_todo todos text =
  Array.append
    todos
    [|
      make_todo (Array.length todos) text false
    |]

let set_completeness todos id complete =
  Array.map
    (fun todo ->
       if id = todo##id
       then make_todo id todo##text complete
       else todo
    )
    todos

let todos = unfold @@ fun state ->
  function
  | Add text -> add_todo state##todos text |> object_of_todos
  | Complete id -> set_completeness state##todos id true |> object_of_todos
  | Uncomplete id -> set_completeness state##todos id false |> object_of_todos
