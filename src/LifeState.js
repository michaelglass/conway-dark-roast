(function() {
  var LifeState, root;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  LifeState = (function() {
    function LifeState() {
      LifeState.__super__.constructor.apply(this, arguments);
    }
    __extends(LifeState, SparseMatrix);
    LifeState.prototype.spawn = function(x, y) {
      return this.set(x, y, true);
    };
    LifeState.prototype.kill = function(x, y) {
      return this.unset(x, y);
    };
    LifeState.prototype.isAlive = function(x, y) {
      return this.get(x, y);
    };
    LifeState.prototype.countNeighbors = function() {
      var neighbors;
      neighbors = new SparseMatrix;
      this.each(function(x, y) {
        var my_x, my_y, num_neighbors, x_offset, y_offset, _ref, _ref2;
        for (x_offset = _ref = -1; (_ref <= 1 ? x_offset <= 1 : x_offset >= 1); (_ref <= 1 ? x_offset += 1 : x_offset -= 1)) {
          for (y_offset = _ref2 = -1; (_ref2 <= 1 ? y_offset <= 1 : y_offset >= 1); (_ref2 <= 1 ? y_offset += 1 : y_offset -= 1)) {
            if (!(x_offset === 0 && y_offset === 0)) {
              my_x = x + x_offset;
              my_y = y + y_offset;
              num_neighbors = (neighbors.get(my_x, my_y) || 0) + 1;
              neighbors.set(my_x, my_y, num_neighbors);
            }
          }
        }
        return true;
      });
      return neighbors;
    };
    LifeState.prototype.tick = function() {
      var neighbors, next_state;
      neighbors = this.countNeighbors();
      next_state = new LifeState;
      neighbors.each(__bind(function(x, y, num_neighbors) {
        if (num_neighbors === 2 && this.isAlive(x, y)) {
          next_state.spawn(x, y);
        }
        if (num_neighbors === 3) {
          return next_state.spawn(x, y);
        }
      }, this));
      this.data = next_state.data;
      delete neighbors;
      return delete next_state;
    };
    return LifeState;
  })();
  root = typeof exports != "undefined" && exports !== null ? exports : this;
  root.LifeState = LifeState;
}).call(this);
