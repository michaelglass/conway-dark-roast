(function() {
  var LifeScreen;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  LifeScreen = (function() {
    function LifeScreen(canvas_selector, life_state) {
      this.state = life_state;
      this.canvas = $(canvas_selector);
      this.context = this.canvas.get(0).getContext('2d');
      this.cells = {
        pixelsPer: 8,
        pixelsLeft: 0,
        pixelsTop: 0
      };
      this.setupGrid();
      this.refreshCells();
      this.speed = 1;
      this.running = false;
    }
    LifeScreen.prototype.setupGrid = function() {
      var x, y, _ref, _ref2;
      for (x = 0.5, _ref = this.canvas.width() + 0.5; (0.5 <= _ref ? x <= _ref : x >= _ref); x += this.cells.pixelsPer) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.canvas.height());
      }
      for (y = 0.5, _ref2 = this.canvas.height() + 0.5; (0.5 <= _ref2 ? y <= _ref2 : y >= _ref2); y += this.cells.pixelsPer) {
        this.context.moveTo(0, y);
        this.context.lineTo(this.canvas.width(), y);
      }
      return this.context.strokeStyle = '#ddd';
    };
    LifeScreen.prototype.drawGrid = function() {
      return this.context.stroke();
    };
    LifeScreen.prototype.refreshCells = function() {
      this.clearCells();
      return this.drawCells();
    };
    LifeScreen.prototype.drawCells = function() {
      var args, x, x_ind, y, y_ind, _ref, _results;
      _results = [];
      for (x_ind = 0, _ref = this.canvas.width() / this.cells.pixelsPer; (0 <= _ref ? x_ind <= _ref : x_ind >= _ref); (0 <= _ref ? x_ind += 1 : x_ind -= 1)) {
        _results.push((function() {
          var _ref, _ref2, _results;
          _results = [];
          for (y_ind = 0, _ref = this.canvas.height() / this.cells.pixelsPer; (0 <= _ref ? y_ind <= _ref : y_ind >= _ref); (0 <= _ref ? y_ind += 1 : y_ind -= 1)) {
            _results.push(this.state.isAlive(x_ind, y_ind) ? (x = x_ind * this.cells.pixelsPer + 1.5, y = y_ind * this.cells.pixelsPer + 1.5, args = [x, y, this.cells.pixelsPer - 1.5, this.cells.pixelsPer - 1.5], (_ref2 = this.context).fillRect.apply(_ref2, args)) : void 0);
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    LifeScreen.prototype.clearCells = function() {
      this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
      return this.drawGrid();
    };
    LifeScreen.prototype.tick = function() {
      this.state.tick();
      return this.refreshCells();
    };
    LifeScreen.prototype.toggle = function() {
      this.running = !this.running;
      if (this.running) {
        return this.run();
      }
    };
    LifeScreen.prototype.stop = function() {
      return this.running = false;
    };
    LifeScreen.prototype.run = function(dontModifyState) {
      if (!dontModifyState) {
        this.running = true;
      }
      if (this.running) {
        this.tick();
        return setTimeout((__bind(function() {
          return this.run(true);
        }, this)), this.speed);
      }
    };
    return LifeScreen;
  })();
  this.LifeScreen = LifeScreen;
}).call(this);
