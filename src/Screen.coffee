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
    @context.beginPath()
    for x in [(0.5+(@cells.pixelsLeft % @cells.pixelsPer))..(@canvas.width()+0.5)] by @cells.pixelsPer
      @context.moveTo(x,0)
      @context.lineTo(x,@canvas.height())
    for y in [(0.5+(@cells.pixelsTop % @cells.pixelsPer))..(@canvas.height()+0.5)] by @cells.pixelsPer
      @context.moveTo(0,y)
      @context.lineTo(@canvas.width(),y)
    @context.strokeStyle = '#ddd'

  strokeGrid: ->
    @context.stroke()

  drawGrid: ->
    @setupGrid()
    @strokeGrid()
    
  refreshCells: ->
    @clearCells()
    @drawCells()
  
  drawCells: ->
    for x_ind in [Math.floor(-1*@cells.pixelsLeft/@cells.pixelsPer)..Math.floor((@canvas.width()-@cells.pixelsLeft)/@cells.pixelsPer)]
      for y_ind in [Math.floor(-1*@cells.pixelsTop/@cells.pixelsPer)..Math.floor((@canvas.height()-@cells.pixelsTop)/@cells.pixelsPer)]
        if @state.isAlive(x_ind, y_ind)
          x = x_ind * @cells.pixelsPer + 1.5 + @cells.pixelsLeft
          y = y_ind * @cells.pixelsPer + 1.5 + @cells.pixelsTop
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

  pan: (x_offset, y_offset) ->
    @cells.pixelsLeft += x_offset
    @cells.pixelsTop += y_offset
    $('#console').append  ( "(#{@cells.pixelsLeft},#{@cells.pixelsTop})\n#{Math.floor(@cells.pixelsLeft/@cells.pixelsPer)}..#{Math.floor((@cells.pixelsLeft+@canvas.width())/@cells.pixelsPer)}\n")

  zoom: (percentChange) ->
    @cells.pixelsPer *= percentChange/100
    @cells.pixelsPer = 2 if @cells.pixelsPer < 2

this.LifeScreen = LifeScreen
