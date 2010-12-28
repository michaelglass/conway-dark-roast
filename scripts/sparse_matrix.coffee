class SparseMatrix
  constructor: ->
    @data = {}

  #returns the value if it is there.  undefined if otherwise.  
  get: (x,y) -> 
    @data[x]?[y]
  set: (x,y,value) ->
    if value == null
      @unset(x,y)
    else
      @data[x] ?= {}
      @data[x][y] = value
      
  unset: (x,y) ->
    delete @data[x]?[y]

  length: ->
    sum = 0
    @each( -> sum++ )
    sum
  #iterates over all coordinates
  #this is unordered!
  # foreach(func(x,y,value){})
  each: (func) ->
    for x, row of @data
      for y, column of row
        func.apply(null, [x,y,@get(x,y)])
    true

class LifeState extends SparseMatrix
  spawn: (x,y) -> set(x,y, true);
  kill: (x,y) -> unset(x,y);
  isAlive: (x,y) -> get(x,y);
  countNeighbors: ->
    neighbors = new SparseMatrix
    @foreach (x,y) ->
      for x_offset in [-1..1]
        for y_offset in [-1..1]
          my_x = x+x_offset
          my_y = y+y_offset
          num_neighbors = (neighbors.get(my_x, my_y) || 0) + 1
          neighbors.set my_x,
                        my_y,
                        num_neighbors
      true
    neighbors
  tick: -> 
    neighbors = @countNeighbors
    next_state = new LifeState
    neighbors.foreach (x,y,num_neighbors) ->
      if num_neighbors == 2 && @isAlive(x,y)
        next_state.live(x,y)
      if num_neighbors == 3
        next_state.live(x,y)
    @data = next_state.data
    delete neighbors
    delete next_state


