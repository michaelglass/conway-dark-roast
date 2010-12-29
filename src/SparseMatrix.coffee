# **SparseMatrix** is a simple sparse matrix implementation.
# it simply stores all data in nested js objects and provides
# functions for 
# - accessing (#get(x,y)), 
# - modifying (#set(x,y,value); #unset(x,y))
# - length (#length())
# - and unordered iteration (#foreach( func(x,y,value) ) )
class SparseMatrix
  constructor: ->
    #initializing data structure here isn't dryest in coffeescript
    #but saves for lots of existiential checks later in javascript
    @data = {}

  #returns the value if it is there.  undefined if otherwise.
  # @param {Number} x x-coordinate
  # @param {Number} y y-coordinate
  # @returns value if assigned, undefined otherwise
  # @throws TypeError for non-numeric x or y
  get: (x,y) ->
    checkXandY 'get',x,y
    @data[x]?[y]

  # sets the value of x,y.  deletes the value if value is null or undefined
  # @param {Number} x x-coordinate
  # @param {Number} y y-coordinate
  # @param value any value for that entry
  # @throws TypeError for non-numeric x or y
  set: (x,y,value) ->
    checkXandY 'set', x,y
    if value?
      @data[x] ?= {}
      @data[x][y] = value
    else
      @unset x,y

  # deletes the value of x,y.  does nothing if x,y empty 
  # @param {Number} x x-coordinate
  # @param {Number} y y-coordinate
  # @throws TypeError for non-numeric x or y
  unset: (x,y) ->
    checkXandY 'unset', x,y        
    delete @data[x]?[y]
    null

  # gets the number of assigned entries in this sparse matrix
  # @returns number of assigned entries
  length: ->
    sum = 0
    @each( -> sum++ )
    sum

  # iterates over all set entries.  Is not ordered!
  # @params {function} func(x,y,value)
  each: (func) ->
    for x, row of @data
      for y, column of row
        x = parseInt(x)
        y = parseInt(y)
        func.apply(null, [x,y,@get(x,y)])


  # @private
  # checks x and y coordinate for caller
  # @param {string} caller name of calling func, for debugging help
  # @param {Number} x x-coordinate
  # @param {Number} y y-coordinate
  # @throws TypeError for non-numeric x or y
  
  checkXandY = (caller, x,y) ->
    for param_name, param_value of {x: x, y: y}
      checkNumericality(caller, param_name, param_value)

  # @private
  # checks numericality of param_value
  # @param {string} caller name of calling func, for informative exception message
  # @param {string} param_name name of parameter to check, for informative exception message
  # @param {number} param_value value of paramter to check against 'number'
  checkNumericality = (caller, param_name, param_value) ->
     expected_type = 'number'

     throw {
       name: 'TypeError'
       message: "\"#{caller}\" expects value of type \"#{expected_type}\" for param, \"#{param_name}\" (received, \"#{param_value}\")"
     } unless typeof(param_value) == expected_type

#establish global context.  it's exports for node.js and this otherwise (for window)
root = exports ? this

root.SparseMatrix = SparseMatrix
