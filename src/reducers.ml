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

let todos = unfold @@ fun state ->
  let state_todos = state##todos |> Array.to_list in
  function
  | Add text -> [%bs.obj {
    todos = add_todo state_todos text |> Array.of_list
  }]
  | Complete id -> [%bs.obj {
    todos = set_completeness state_todos id true |> Array.of_list
  }]
  | Uncomplete id -> [%bs.obj {
    todos = set_completeness state_todos id false |> Array.of_list
  }]
