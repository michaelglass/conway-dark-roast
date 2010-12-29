(function() {
  var SparseMatrix, root;
  SparseMatrix = (function() {
    var checkNumericality, checkXandY;
    function SparseMatrix() {
      this.data = {};
    }
    SparseMatrix.prototype.get = function(x, y) {
      var _ref;
      checkXandY('get', x, y);
      return (_ref = this.data[x]) != null ? _ref[y] : void 0;
    };
    SparseMatrix.prototype.set = function(x, y, value) {
      var _base, _ref;
      checkXandY('set', x, y);
      if (value != null) {
        (_ref = (_base = this.data)[x]) != null ? _ref : _base[x] = {};
        return this.data[x][y] = value;
      } else {
        return this.unset(x, y);
      }
    };
    SparseMatrix.prototype.unset = function(x, y) {
      var _ref;
      checkXandY('unset', x, y);
      if ((_ref = this.data[x]) != null) {
        delete _ref[y];
      }
      return null;
    };
    SparseMatrix.prototype.length = function() {
      var sum;
      sum = 0;
      this.each(function() {
        return sum++;
      });
      return sum;
    };
    SparseMatrix.prototype.each = function(func) {
      var column, row, x, y, _ref, _results;
      _ref = this.data;
      _results = [];
      for (x in _ref) {
        row = _ref[x];
        _results.push((function() {
          var _results;
          _results = [];
          for (y in row) {
            column = row[y];
            x = parseInt(x);
            y = parseInt(y);
            _results.push(func.apply(null, [x, y, this.get(x, y)]));
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    checkXandY = function(caller, x, y) {
      var param_name, param_value, _ref, _results;
      _ref = {
        x: x,
        y: y
      };
      _results = [];
      for (param_name in _ref) {
        param_value = _ref[param_name];
        _results.push(checkNumericality(caller, param_name, param_value));
      }
      return _results;
    };
    checkNumericality = function(caller, param_name, param_value) {
      var expected_type;
      expected_type = 'number';
      if (typeof param_value !== expected_type) {
        throw {
          name: 'TypeError',
          message: "\"" + caller + "\" expects value of type \"" + expected_type + "\" for param, \"" + param_name + "\" (received, \"" + param_value + "\")"
        };
      }
    };
    return SparseMatrix;
  })();
  root = typeof exports != "undefined" && exports !== null ? exports : this;
  root.SparseMatrix = SparseMatrix;
}).call(this);
