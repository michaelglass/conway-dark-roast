(function() {
  describe('LifeState', function() {
    var coords, state;
    state = coords = null;
    beforeEach(function() {
      var _i, _ref, _results;
      state = new LifeState;
      return coords = (function() {
        _results = [];
        for (var _i = _ref = -1; _ref <= 5 ? _i <= 5 : _i >= 5; _ref <= 5 ? _i += 1 : _i -= 1){ _results.push(_i); }
        return _results;
      }).call(this);
    });
    describe('#isAlive', function() {
      return it('should return true for live cells and false otherwise', function() {
        var coord, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          coord = coords[_i];
          state.set(coord, coord, true);
          expect(state.isAlive(coord, coord)).toBeTruthy();
          _results.push(expect(state.isAlive(coord, coord + 1)).toBeFalsy());
        }
        return _results;
      });
    });
    describe('#spawn', function() {
      return it('should set cells to living', function() {
        var coord, _i, _j, _len, _len2, _results;
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          coord = coords[_i];
          state.spawn(coord, coord);
        }
        _results = [];
        for (_j = 0, _len2 = coords.length; _j < _len2; _j++) {
          coord = coords[_j];
          _results.push(expect(state.isAlive(coord, coord)).toBeTruthy());
        }
        return _results;
      });
    });
    describe('#kill', function() {
      return it('should set cells to dead', function() {
        var coord, _i, _j, _k, _len, _len2, _len3, _results;
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          coord = coords[_i];
          state.spawn(coord, coord);
        }
        for (_j = 0, _len2 = coords.length; _j < _len2; _j++) {
          coord = coords[_j];
          state.kill(coord, coord);
        }
        _results = [];
        for (_k = 0, _len3 = coords.length; _k < _len3; _k++) {
          coord = coords[_k];
          _results.push(expect(state.isAlive(coord, coord)).toBeFalsy());
        }
        return _results;
      });
    });
    return describe('given a starting state', function() {
      beforeEach(function() {
        var coords, initialState, _i, _len, _results;
        initialState = [[0, 0], [0, 1], [0, 2]];
        _results = [];
        for (_i = 0, _len = initialState.length; _i < _len; _i++) {
          coords = initialState[_i];
          _results.push(state.spawn.apply(state, coords));
        }
        return _results;
      });
      describe('countNeighbors', function() {
        return it('should yield a spare matrix with the right counting', function() {
          return expect(state.countNeighbors().data).toEqual({
            '-1': {
              '-1': 1,
              '0': 2,
              '1': 3,
              '2': 2,
              '3': 1
            },
            '0': {
              '-1': 1,
              '0': 1,
              '1': 2,
              '2': 1,
              '3': 1
            },
            '1': {
              '-1': 1,
              '0': 2,
              '1': 3,
              '2': 2,
              '3': 1
            }
          });
        });
      });
      return describe('tick', function() {
        return it('should use bring up the next correct state', function() {
          var results, x, y, _ref, _results;
          state.tick();
          results = "";
          _results = [];
          for (x = _ref = -1; (_ref <= 1 ? x <= 1 : x >= 1); (_ref <= 1 ? x += 1 : x -= 1)) {
            _results.push((function() {
              var _ref, _results;
              _results = [];
              for (y = _ref = -1; (_ref <= 3 ? y <= 3 : y >= 3); (_ref <= 3 ? y += 1 : y -= 1)) {
                if (state.isAlive(x, y)) {
                  results += "[" + x + "," + y + "],";
                }
                _results.push(y === 1 ? expect(state.isAlive(x, y)).toBeTruthy() : expect(state.isAlive(x, y)).toBeFalsy());
              }
              return _results;
            })());
          }
          return _results;
        });
      });
    });
  });
}).call(this);
