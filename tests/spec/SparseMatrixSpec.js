(function() {
  describe('SparseMatrix', function() {
    var matrix;
    matrix = null;
    beforeEach(function() {
      return matrix = new SparseMatrix;
    });
    describe('on creation, before manipulation', function() {
      it('should have #length of 0', function() {
        return expect(matrix.length()).toBe(0);
      });
      return it('should not call func passed to #each', function() {
        var callback;
        callback = jasmine.createSpy();
        matrix.each(callback);
        return expect(callback).not.toHaveBeenCalled();
      });
    });
    describe('#set and #get', function() {
      it('set should add entries and get should retrieve them', function() {
        var coord, numAdded, vals, _i, _j, _k, _len, _len2, _ref, _results, _results2;
        vals = (function() {
          _results = [];
          for (var _i = _ref = -1; _ref <= 5 ? _i <= 5 : _i >= 5; _ref <= 5 ? _i += 1 : _i -= 1){ _results.push(_i); }
          return _results;
        }).call(this);
        numAdded = 0;
        for (_j = 0, _len = vals.length; _j < _len; _j++) {
          coord = vals[_j];
          matrix.set(coord, coord, "" + coord + "!!");
          numAdded++;
          expect(matrix.length()).toBe(numAdded);
        }
        _results2 = [];
        for (_k = 0, _len2 = vals.length; _k < _len2; _k++) {
          coord = vals[_k];
          _results2.push(expect(matrix.get(coord, coord)).toBe("" + coord + "!!"));
        }
        return _results2;
      });
      it('should remove entries when set with null or undefined value; should should get "undefined" when that value doesn\'t exist', function() {
        var coord, numAdded, vals, willDelete, _i, _j, _k, _len, _len2, _ref, _ref2, _results, _results2;
        expect(matrix.get(-1, -1)).toBe(void 0);
        vals = (function() {
          _results = [];
          for (var _i = _ref = -1; _ref <= 5 ? _i <= 5 : _i >= 5; _ref <= 5 ? _i += 1 : _i -= 1){ _results.push(_i); }
          return _results;
        }).call(this);
        numAdded = 0;
        _ref2 = [null, void 0];
        _results2 = [];
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          willDelete = _ref2[_j];
          for (_k = 0, _len2 = vals.length; _k < _len2; _k++) {
            coord = vals[_k];
            matrix.set(coord, coord, true);
            numAdded++;
            expect(matrix.length()).toBe(numAdded);
          }
          _results2.push((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = vals.length; _i < _len; _i++) {
              coord = vals[_i];
              matrix.set(coord, coord, willDelete);
              numAdded--;
              expect(matrix.length()).toBe(numAdded);
              _results.push(expect(matrix.get(coord, coord)).toBe(void 0));
            }
            return _results;
          })());
        }
        return _results2;
      });
      return it('should throw a typeError for non_numeric x or y', function() {
        var bad_var, method, params, _i, _len, _ref, _results;
        _ref = ['get', 'set'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          method = _ref[_i];
          _results.push((function() {
            var _ref, _results;
            _ref = {
              x: ['fartface', 0],
              y: [0, 'fartface']
            };
            _results = [];
            for (bad_var in _ref) {
              params = _ref[bad_var];
              _results.push(expect(function() {
                return matrix[method].apply(matrix, params.concat(true));
              }).toThrow({
                name: 'TypeError',
                message: "\"" + method + "\" expects value of type \"number\" for param, \"" + bad_var + "\" (received, \"fartface\")"
              }));
            }
            return _results;
          })());
        }
        return _results;
      });
    });
    return describe('#each(func(x,y,value))', function() {
      return it('should call callback, passing it x,y,value triads', function() {
        var callback, coords, vals, _i, _j, _k, _len, _len2, _ref, _results;
        vals = (function() {
          _results = [];
          for (var _i = _ref = -1; _ref <= 5 ? _i <= 5 : _i >= 5; _ref <= 5 ? _i += 1 : _i -= 1){ _results.push(_i); }
          return _results;
        }).call(this);
        for (_j = 0, _len = vals.length; _j < _len; _j++) {
          coords = vals[_j];
          matrix.set(coords, coords, coords);
        }
        callback = jasmine.createSpy();
        matrix.each(callback);
        for (_k = 0, _len2 = vals.length; _k < _len2; _k++) {
          coords = vals[_k];
          expect(callback).toHaveBeenCalledWith(coords, coords, coords);
        }
        return expect(callback.callCount).toEqual(7);
      });
    });
  });
}).call(this);
