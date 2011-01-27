class LifeScreen
  constructor: (parent_selector, life_state) ->
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

        
    parent = $(parent_selector)
    parent.append('<canvas id="grid" class="lifeScreen" height=640 width=480></canvas>')
    parent.append('<canvas id="foreground" class="lifeScreen" height=640 width=480></canvas>')
    @background = $('#grid').get(0).getContext('2d')
    @foreground = $('#foreground').get(0).getContext('2d')

    canvas = $('#foreground')
    @context = @foreground
    @height = canvas.height()
    @width = canvas.width()

    #pan/zoom 
    @nextCells =
      pixelsPer:  8
      pixelsLeft: 0 #starts with origin at 0,0, this is the pixel offset
      pixelsTop:  0


    #draws cells, grid
    setInterval((=> @draw()), @drawInterval)
    
    @running = false
    @run(true) #will run but wont do anything if running is false


  #creates and draws grid
  drawGrid: ->
    if !@currentCells? ||
       @currentCells.pixelsLeft != @nextCells.pixelsLeft ||
       @currentCells.pixelsRight != @nextCells.pixelsRight ||
       @currentCells.pixelsPer != @nextCells.pixelsPer

      @background.clearRect(0,0,@width,@height) 
      @background.fillStyle = '#eee'
      for x in [(0.5+(@nextCells.pixelsLeft % @nextCells.pixelsPer))..(@width+0.5)] by @nextCells.pixelsPer
        @background.fillRect(x,0,0.5,@height)
      for y in [(0.5+(@nextCells.pixelsTop % @nextCells.pixelsPer))..(@height+0.5)] by @nextCells.pixelsPer
        @background.fillRect(0,y,@width,0.5)
      @currentCells = $.extend({}, @nextCells)

  drawCells: ->
    @context.clearRect(0,0,@width, @height)
    @context.fillStyle = "#000"
    for x_ind in [Math.floor(-1*@currentCells.pixelsLeft/@currentCells.pixelsPer)..Math.floor((@width-@currentCells.pixelsLeft)/@currentCells.pixelsPer)]
      for y_ind in [Math.floor(-1*@currentCells.pixelsTop/@currentCells.pixelsPer)..Math.floor((@height-@currentCells.pixelsTop)/@currentCells.pixelsPer)]
        if @state.isAlive(x_ind, y_ind)
          x = x_ind * @currentCells.pixelsPer + 1.5 + @currentCells.pixelsLeft
          y = y_ind * @currentCells.pixelsPer + 1.5 + @currentCells.pixelsTop
          args = [x,y,@currentCells.pixelsPer-1.5, @currentCells.pixelsPer-1.5]
          @context.fillRect(args...)
  
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
    @nextCells.pixelsLeft += x_offset
    @nextCells.pixelsTop += y_offset

  zoom: (percentChange) ->
    @nextCells.pixelsPer *= percentChange/100
    @nextCells.pixelsPer = 2 if @nextCells.pixelsPer < 2

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

    @drawGrid()
    @drawCells()
    @frameCount++


this.LifeScreen = LifeScreen
