describe 'SparseMatrix', ->
  matrix = null

  beforeEach ->
    matrix = new SparseMatrix

  describe 'on creation, before manipulation', ->
    it 'should have #length of 0', ->
      expect(matrix.length()).toBe(0)
    it 'should not call func passed to #each', ->
      callback = jasmine.createSpy()
      matrix.each( callback )
      expect(callback).not.toHaveBeenCalled()

  describe '#set and #get', ->
    it 'set should add entries and get should retrieve them', ->
      vals = [-1..5]
      numAdded = 0
      for coord in vals
        matrix.set(coord, coord, "#{coord}!!")
        numAdded++
        expect( matrix.length() ).toBe(numAdded)

      for coord in vals
        expect( matrix.get coord,coord ).toBe("#{coord}!!")

    it 'should remove entries when set with null or undefined value; should should get "undefined" when that value doesn\'t exist', ->
      expect( matrix.get(-1, -1) ).toBe undefined
      vals = [-1..5]
      numAdded = 0
      for willDelete in [null, undefined]
        for coord in vals
          matrix.set(coord, coord, true)
          numAdded++
          expect(matrix.length()).toBe(numAdded)
        for coord in vals
            matrix.set(coord,coord,willDelete)
            numAdded--
            expect( matrix.length() ).toBe(numAdded)
            expect( matrix.get(coord, coord) ).toBe(undefined)

    it 'should throw a typeError for non_numeric x or y', ->
      for method in ['get', 'set']
        for bad_var, params of { x:['fartface', 0], y:[0, 'fartface'] }
          
          expect( -> matrix[method](params.concat(true)...  )).
            toThrow({
              name: 'TypeError'
              message: "\"#{method}\" expects value of type \"number\" for param, \"#{bad_var}\" (received, \"fartface\")"
            })

  describe '#each(func(x,y,value))', ->
    it 'should call callback, passing it x,y,value triads', ->
      vals = [-1..5]
      for coords in vals
        matrix.set(coords, coords, coords)

      callback = jasmine.createSpy()
      matrix.each( callback )
      
      for coords in vals
        expect(callback).toHaveBeenCalledWith(coords, coords, coords)

      expect(callback.callCount).toEqual(7)
