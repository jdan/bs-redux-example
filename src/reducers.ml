open Types;;

let counter = unfold @@ fun state -> function
  | Increment n -> [%bs.obj { count = state##count + n }]
  | Decrement n -> [%bs.obj { count = state##count - n }]
  | Reset -> [%bs.obj { count = 0 }]
