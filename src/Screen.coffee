class LifeScreen
  constructor: (canvas_selector, life_state) ->
    #rendering stuff
    @frameCount = 0.0
    @drawInterval = 16.66666 #maxFPS = 60FPS
    @realFPS = 0

    @lastTime = new Date()

    #computation time
    @tickCount = 0.0
    @speed = 80
    
    @tickFPS = 0


    #logic backend
    @state = life_state

        
    canvas = $(canvas_selector)
    @context = canvas.get(0).getContext('2d')
    @height = canvas.height()
    @width = canvas.width()

    #pan/zoom 
    @cells =
      pixelsPer:  8
      pixelsLeft: 0 #starts with origin at 0,0, this is the pixel offset
      pixelsTop:  0


    #draws cells, grid
    setInterval((=> @draw()), @drawInterval)
    
    @running = false
    @run(true) #will run but wont do anything if running is false


  #creates and draws grid
  drawGrid: ->
    @context.fillStyle = '#eee'
    for x in [(0.5+(@cells.pixelsLeft % @cells.pixelsPer))..(@width+0.5)] by @cells.pixelsPer
      @context.fillRect(x,0,0.5,@height)
    for y in [(0.5+(@cells.pixelsTop % @cells.pixelsPer))..(@height+0.5)] by @cells.pixelsPer
      @context.fillRect(0,y,@width,0.5)
  
  drawCells: ->
    @context.fillStyle = "#000"
    for x_ind in [Math.floor(-1*@cells.pixelsLeft/@cells.pixelsPer)..Math.floor((@width-@cells.pixelsLeft)/@cells.pixelsPer)]
      for y_ind in [Math.floor(-1*@cells.pixelsTop/@cells.pixelsPer)..Math.floor((@height-@cells.pixelsTop)/@cells.pixelsPer)]
        if @state.isAlive(x_ind, y_ind)
          x = x_ind * @cells.pixelsPer + 1.5 + @cells.pixelsLeft
          y = y_ind * @cells.pixelsPer + 1.5 + @cells.pixelsTop
          args = [x,y,@cells.pixelsPer-1.5, @cells.pixelsPer-1.5]
          @context.fillRect(args...)
  
  clearCells: ->
    @context.clearRect(0,0,@width, @height)
    @drawGrid()
  

  toggle: ->
    if @running
      @stop()
    else
      @run()

  stop: ->
    @running = false

  tick: ->
    @state.tick()
    @tickCount++

  run: (dontModifyState) ->
    @running = true unless dontModifyState
      
    if @running
      @tick()
      setTimeout( (=> @run(true)), @speed )

  pan: (x_offset, y_offset) ->
    @cells.pixelsLeft += x_offset
    @cells.pixelsTop += y_offset

  zoom: (percentChange) ->
    @cells.pixelsPer *= percentChange/100
    @cells.pixelsPer = 2 if @cells.pixelsPer < 2

  #draws state
  draw: ->
    nowTime = new Date()
    diffTime = Math.ceil(nowTime.getTime() - @lastTime.getTime())
    if diffTime >= 1000
      @realFPS = @frameCount
      @tickFPS = @tickCount
      @tickCount = 0
      @frameCount = 0
      @lastTime = nowTime

    @clearCells()
    @drawCells()
    @frameCount++


this.LifeScreen = LifeScreen
