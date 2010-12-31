(function() {
  var LifeScreen;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  LifeScreen = (function() {
    function LifeScreen(canvas_selector, life_state) {
      var canvas;
      this.frameCount = 0.0;
      this.drawInterval = 16.66666;
      this.realFPS = 0;
      this.lastTime = new Date();
      this.tickCount = 0.0;
      this.speed = 80;
      this.tickFPS = 0;
      this.state = life_state;
      canvas = $(canvas_selector);
      this.context = canvas.get(0).getContext('2d');
      this.height = canvas.height();
      this.width = canvas.width();
      this.cells = {
        pixelsPer: 8,
        pixelsLeft: 0,
        pixelsTop: 0
      };
      setInterval((__bind(function() {
        return this.draw();
      }, this)), this.drawInterval);
      this.running = false;
      this.run(true);
    }
    LifeScreen.prototype.drawGrid = function() {
      var x, y, _ref, _ref2, _ref3, _ref4, _results;
      this.context.fillStyle = '#eee';
      for (x = _ref = 0.5 + (this.cells.pixelsLeft % this.cells.pixelsPer), _ref2 = this.width + 0.5; (_ref <= _ref2 ? x <= _ref2 : x >= _ref2); x += this.cells.pixelsPer) {
        this.context.fillRect(x, 0, 0.5, this.height);
      }
      _results = [];
      for (y = _ref3 = 0.5 + (this.cells.pixelsTop % this.cells.pixelsPer), _ref4 = this.height + 0.5; (_ref3 <= _ref4 ? y <= _ref4 : y >= _ref4); y += this.cells.pixelsPer) {
        _results.push(this.context.fillRect(0, y, this.width, 0.5));
      }
      return _results;
    };
    LifeScreen.prototype.drawCells = function() {
      var args, x, x_ind, y, y_ind, _ref, _ref2, _results;
      this.context.fillStyle = "#000";
      _results = [];
      for (x_ind = _ref = Math.floor(-1 * this.cells.pixelsLeft / this.cells.pixelsPer), _ref2 = Math.floor((this.width - this.cells.pixelsLeft) / this.cells.pixelsPer); (_ref <= _ref2 ? x_ind <= _ref2 : x_ind >= _ref2); (_ref <= _ref2 ? x_ind += 1 : x_ind -= 1)) {
        _results.push((function() {
          var _ref, _ref2, _ref3, _results;
          _results = [];
          for (y_ind = _ref = Math.floor(-1 * this.cells.pixelsTop / this.cells.pixelsPer), _ref2 = Math.floor((this.height - this.cells.pixelsTop) / this.cells.pixelsPer); (_ref <= _ref2 ? y_ind <= _ref2 : y_ind >= _ref2); (_ref <= _ref2 ? y_ind += 1 : y_ind -= 1)) {
            _results.push(this.state.isAlive(x_ind, y_ind) ? (x = x_ind * this.cells.pixelsPer + 1.5 + this.cells.pixelsLeft, y = y_ind * this.cells.pixelsPer + 1.5 + this.cells.pixelsTop, args = [x, y, this.cells.pixelsPer - 1.5, this.cells.pixelsPer - 1.5], (_ref3 = this.context).fillRect.apply(_ref3, args)) : void 0);
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    LifeScreen.prototype.clearCells = function() {
      this.context.clearRect(0, 0, this.width, this.height);
      return this.drawGrid();
    };
    LifeScreen.prototype.toggle = function() {
      if (this.running) {
        return this.stop();
      } else {
        return this.run();
      }
    };
    LifeScreen.prototype.stop = function() {
      return this.running = false;
    };
    LifeScreen.prototype.tick = function() {
      this.state.tick();
      return this.tickCount++;
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
      return this.cells.pixelsTop += y_offset;
    };
    LifeScreen.prototype.zoom = function(percentChange) {
      this.cells.pixelsPer *= percentChange / 100;
      if (this.cells.pixelsPer < 2) {
        return this.cells.pixelsPer = 2;
      }
    };
    LifeScreen.prototype.draw = function() {
      var diffTime, nowTime;
      nowTime = new Date();
      diffTime = Math.ceil(nowTime.getTime() - this.lastTime.getTime());
      if (diffTime >= 1000) {
        this.realFPS = this.frameCount;
        this.tickFPS = this.tickCount;
        this.tickCount = 0;
        this.frameCount = 0;
        this.lastTime = nowTime;
      }
      this.clearCells();
      this.drawCells();
      return this.frameCount++;
    };
    return LifeScreen;
  })();
  this.LifeScreen = LifeScreen;
}).call(this);
