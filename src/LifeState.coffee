#**LifeState** is embodies pretty much all of the logic for the 
#game of life.  
class LifeState extends SparseMatrix
  # creates life at x,y
  spawn: (x,y) -> @set(x,y, true)

  # removes life at x,y
  kill: (x,y) -> @unset(x,y)

  # checks for life at x,y
  isAlive: (x,y) -> @get(x,y)

  # this really could be private.
  # creates SparseMatrix with the counts for all neighbors of current state
  # used to compute next state.
  countNeighbors: ->
    neighbors = new SparseMatrix
    @each (x,y) ->
      for x_offset in [-1..1]
        for y_offset in [-1..1]
          unless x_offset == 0 && y_offset == 0
            my_x = x+x_offset
            my_y = y+y_offset
            num_neighbors = (neighbors.get(my_x, my_y) || 0) + 1
            neighbors.set my_x,
                          my_y,
                          num_neighbors
      true
    neighbors

  # moves state forward one step.
  tick: ->
    neighbors = @countNeighbors()
    next_state = new LifeState
    neighbors.each (x,y,num_neighbors) =>
      if num_neighbors == 2 && @isAlive(x,y)
        next_state.spawn(x,y)
      if num_neighbors == 3
        next_state.spawn(x,y)
    @data = next_state.data
    delete neighbors
    delete next_state

#establish global context.  it's exports for node.js and this otherwise (for window)
root = exports ? this

root.LifeState = LifeState
