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
      var x, y, _ref, _ref2, _ref3, _ref4;
      this.context.beginPath();
      for (x = _ref = 0.5 + (this.cells.pixelsLeft % this.cells.pixelsPer), _ref2 = this.canvas.width() + 0.5; (_ref <= _ref2 ? x <= _ref2 : x >= _ref2); x += this.cells.pixelsPer) {
        this.context.moveTo(x, 0);
        this.context.lineTo(x, this.canvas.height());
      }
      for (y = _ref3 = 0.5 + (this.cells.pixelsTop % this.cells.pixelsPer), _ref4 = this.canvas.height() + 0.5; (_ref3 <= _ref4 ? y <= _ref4 : y >= _ref4); y += this.cells.pixelsPer) {
        this.context.moveTo(0, y);
        this.context.lineTo(this.canvas.width(), y);
      }
      return this.context.strokeStyle = '#ddd';
    };
    LifeScreen.prototype.strokeGrid = function() {
      return this.context.stroke();
    };
    LifeScreen.prototype.drawGrid = function() {
      this.setupGrid();
      return this.strokeGrid();
    };
    LifeScreen.prototype.refreshCells = function() {
      this.clearCells();
      return this.drawCells();
    };
    LifeScreen.prototype.drawCells = function() {
      var args, x, x_ind, y, y_ind, _ref, _ref2, _results;
      _results = [];
      for (x_ind = _ref = Math.floor(-1 * this.cells.pixelsLeft / this.cells.pixelsPer), _ref2 = Math.floor((this.canvas.width() - this.cells.pixelsLeft) / this.cells.pixelsPer); (_ref <= _ref2 ? x_ind <= _ref2 : x_ind >= _ref2); (_ref <= _ref2 ? x_ind += 1 : x_ind -= 1)) {
        _results.push((function() {
          var _ref, _ref2, _ref3, _results;
          _results = [];
          for (y_ind = _ref = Math.floor(-1 * this.cells.pixelsTop / this.cells.pixelsPer), _ref2 = Math.floor((this.canvas.height() - this.cells.pixelsTop) / this.cells.pixelsPer); (_ref <= _ref2 ? y_ind <= _ref2 : y_ind >= _ref2); (_ref <= _ref2 ? y_ind += 1 : y_ind -= 1)) {
            _results.push(this.state.isAlive(x_ind, y_ind) ? (x = x_ind * this.cells.pixelsPer + 1.5 + this.cells.pixelsLeft, y = y_ind * this.cells.pixelsPer + 1.5 + this.cells.pixelsTop, args = [x, y, this.cells.pixelsPer - 1.5, this.cells.pixelsPer - 1.5], (_ref3 = this.context).fillRect.apply(_ref3, args)) : void 0);
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
    LifeScreen.prototype.pan = function(x_offset, y_offset) {
      this.cells.pixelsLeft += x_offset;
      this.cells.pixelsTop += y_offset;
      return $('#console').append("(" + this.cells.pixelsLeft + "," + this.cells.pixelsTop + ")\n" + (Math.floor(this.cells.pixelsLeft / this.cells.pixelsPer)) + ".." + (Math.floor((this.cells.pixelsLeft + this.canvas.width()) / this.cells.pixelsPer)) + "\n");
    };
    LifeScreen.prototype.zoom = function(percentChange) {
      this.cells.pixelsPer *= percentChange / 100;
      if (this.cells.pixelsPer < 2) {
        return this.cells.pixelsPer = 2;
      }
    };
    return LifeScreen;
  })();
  this.LifeScreen = LifeScreen;
}).call(this);
