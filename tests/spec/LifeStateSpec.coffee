describe 'LifeState', ->
  state = coords = null
  beforeEach ->
    state = new LifeState
    coords = [-1..5]

  describe '#isAlive', ->
    it 'should return true for live cells and false otherwise', ->
      for coord in coords
        state.set(coord, coord, true)
        expect(state.isAlive(coord, coord)).toBeTruthy()
        expect(state.isAlive(coord, coord+1)).toBeFalsy()

  describe '#spawn', ->
    it 'should set cells to living', ->
      for coord in coords
        state.spawn(coord, coord)
      for coord in coords
        expect(state.isAlive(coord, coord)).toBeTruthy()
  describe '#kill', ->
    it 'should set cells to dead', ->
      for coord in coords
        state.spawn(coord, coord)
      for coord in coords
        state.kill(coord, coord)
      for coord in coords
        expect(state.isAlive(coord, coord)).toBeFalsy()

  
  
  describe 'given a starting state', ->
    beforeEach ->
      initialState = [[0,0],[0,1],[0,2]]
      for coords in initialState
        state.spawn(coords...)
    describe 'countNeighbors', ->
      it 'should yield a spare matrix with the right counting', ->
        expect(state.countNeighbors().data).toEqual('-1':
          '-1': 1
          '0': 2
          '1': 3
          '2': 2
          '3': 1
        '0':
          '-1': 1
          '0': 1
          '1': 2
          '2': 1
          '3': 1
        '1':
          '-1': 1
          '0': 2
          '1': 3
          '2': 2
          '3': 1
        )
       
    describe 'tick', ->
      it 'should use bring up the next correct state', ->
        state.tick()
        
        results = ""
        for x in [-1..1]
          for y in [-1..3]
            results += "[#{x},#{y}]," if state.isAlive(x,y)
            if y == 1
              expect(state.isAlive(x,y)).toBeTruthy()
            else
              expect(state.isAlive(x,y)).toBeFalsy()
