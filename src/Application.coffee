$(document).ready ->
  state = new LifeState
  canvas = $('#screen')
  randomizeLife(state, [0..Math.ceil(canvas.width()/8)], [0..Math.ceil(canvas.height()/8)])
  screen = new LifeScreen '#screen', state
  $('#tick').click ->
    screen.tick()
    false
  
  $('#toggle').click ->
    screen.toggle()
    false

  $('#clear').click ->
    screen.stop()
    delete screen.state
    screen.state = new LifeState
    screen.refreshCells()
    false

  $('#randomize').click ->
    screen.stop()
    delete screen.tate
    screen.state = new LifeState
    randomizeLife(screen.state, [0..Math.ceil(canvas.width()/8)], [0..Math.ceil(canvas.height()/8)])
    screen.refreshCells()
    false
    


randomizeLife = (state, range_x, range_y)  ->
  for x in range_x
    for y in range_y
      state.spawn(x,y) if Math.random() > 0.5
