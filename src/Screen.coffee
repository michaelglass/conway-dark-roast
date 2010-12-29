class LifeScreen
  constructor: (canvas_selector, life_state) ->

    @state = life_state
    @canvas = $(canvas_selector)
    @context = @canvas.get(0).getContext('2d')
    @cells =
      pixelsPer:  8
      pixelsLeft: 0 #starts with origin at 0,0, this is the pixel offset
      pixelsTop:  0
    @setupGrid()
    @refreshCells()

    @speed = 1
    @running = false

  setupGrid: ->
    for x in [0.5..(@canvas.width()+0.5)] by @cells.pixelsPer
      @context.moveTo(x,0)
      @context.lineTo(x,@canvas.height())
    for y in [0.5..(@canvas.height()+0.5)] by @cells.pixelsPer
      @context.moveTo(0,y)
      @context.lineTo(@canvas.width(),y)
    @context.strokeStyle = '#ddd'

  drawGrid: ->
    @context.stroke()
    
  refreshCells: ->
    @clearCells()
    @drawCells()
  
  drawCells: ->
    for x_ind in [0..(@canvas.width()/@cells.pixelsPer)]
      for y_ind in [0..(@canvas.height()/@cells.pixelsPer)]
        if @state.isAlive(x_ind, y_ind)
          x = x_ind * @cells.pixelsPer + 1.5
          y = y_ind * @cells.pixelsPer + 1.5
          args = [x,y,@cells.pixelsPer-1.5, @cells.pixelsPer-1.5]
          @context.fillRect(args...)
  
  clearCells: ->
    @context.clearRect(0,0,@canvas.width(), @canvas.height())
    @drawGrid()
  
  tick: ->
    @state.tick()
    @refreshCells()

  toggle: ->
    @running = !@running

    @run() if @running

  stop: ->
    @running = false


  run: (dontModifyState) ->
    @running = true unless dontModifyState
      
    if @running
      @tick()
      setTimeout( (=> @run(true)), @speed )

this.LifeScreen = LifeScreen
