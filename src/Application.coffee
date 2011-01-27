#clears the game board
clearScreen = (screen) ->
  #stop ticking
  screen.stop()
  
  #reset state
  newState = new LifeState
  oldState = screen.state
  screen.state = newState
  #trash the old one, maybe this isn't necessary, javascript noob, 
  #don't totally understand GC.
  delete oldState if oldState?

#randomly populates life in screen over range_x, range_y 
randomizeScreen = (screen, range_x, range_y) ->
  clearScreen(screen)
  for x in range_x
    for y in range_y
      screen.state.spawn(x,y) if Math.random() > 0.5
      

$(document).ready ->
  #create the screen
  screen = new LifeScreen '#screen', new LifeState
  
  #and populate it
  randomizeScreen(screen, [50..100], [25..50])
  
  #update the fps once a second
  setInterval((-> $('#fps').text(screen.realFPS)), 1000)
  setInterval((-> $('#tickFps').text(screen.tickFPS)), 1000)

  #tick moves the state of the game one generation forward
  $('#tick').click ->
    screen.tick()
    false
  
  #stops or starts auto ticking
  $('#toggle').click ->
    screen.toggle()
    false

  $('#clear').click ->
    clearScreen(screen)
    false

  #randomizes current state (ie, clears; creates a bunch of life)
  $('#randomize').click ->
    randomizeScreen(screen, [50..100], [25..50])
    false
  
  #... self explanatory
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
  $('#screen').mousewheel (event, delta) ->
    screen.zoom(100 + (delta * -1 * 10))
