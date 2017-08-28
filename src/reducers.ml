open Types;;

let add_todo todos text =
  [%bs.obj {
    id = List.length todos;
    text = text;
    complete = false
  }] :: todos

let rec set_completeness todos id complete = match todos with
  | [] -> []
  | (todo::tail) ->
    if todo##id = id then [%bs.obj {
      id = id;
      text = todo##text;
      complete = complete;
    }] :: tail
    else todo :: set_completeness tail id complete

let object_of_todos todos = [%bs.obj {
  todos = todos
}]

let todos = unfold @@ fun state ->
  let state_todos = state##todos |> Array.to_list in
  function
  | Add text -> add_todo state_todos text |> Array.of_list |> object_of_todos
  | Complete id -> set_completeness state_todos id true |> Array.of_list |> object_of_todos
  | Uncomplete id -> set_completeness state_todos id false |> Array.of_list |> object_of_todos
