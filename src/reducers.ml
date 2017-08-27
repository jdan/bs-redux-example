open Types;;

let counter state action = match action##value with
  | Increment n -> [%bs.obj { count = state##count + n }]
  | Decrement n -> [%bs.obj { count = state##count - n }]
  | Reset -> [%bs.obj { count = 0 }]
