$(document).ready ->
  screen = new LifeScreen '#screen', new LifeState
  randomizeScreen(screen, [50..100], [25..50])
  
  setInterval((-> $('#fps').text(screen.realFPS)), 1000)
  setInterval((-> $('#tickFps').text(screen.tickFPS)), 1000)
  canvas = $('#screen')

  $('#tick').click ->
    screen.tick()
    false
  
  $('#toggle').click ->
    screen.toggle()
    false

  $('#clear').click ->
    clearScreen(screen)
    false

  $('#randomize').click ->
    randomizeScreen(screen, [50..100], [25..50])
    false

  $('#speed').change ->
    new_speed = parseInt($(this).val())
    if new_speed > 0
      screen.speed = new_speed

  $('#left').click ->
    screen.pan(1, 0)
  $('#right').click ->
    screen.pan(-1, 0)
  $('#up').click ->
    screen.pan(0, 1)
  $('#down').click ->
    screen.pan(0, -1)
  $('#zoomin').click ->
    screen.zoom(150)
  $('#zoomout').click ->
    screen.zoom(50)
  canvas.mousewheel (event, delta) ->
    #-0.015 -> 105
    #0.015 -> 95
    screen.zoom(100 + (delta * -1 * 10))

clearScreen = (screen) ->
  screen.stop()
  newState = new LifeState
  oldState = screen.state
  screen.state = newState
  delete oldState if oldState?

randomizeScreen = (screen, range_x, range_y) ->
  clearScreen(screen)
  randomizeLife(screen.state, range_x, range_y)

randomizeLife = (state, range_x, range_y)  ->
  for x in range_x
    for y in range_y
      state.spawn(x,y) if Math.random() > 0.5
