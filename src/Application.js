(function() {
  var clearScreen, randomizeScreen;
  clearScreen = function(screen) {
    var newState, oldState;
    screen.stop();
    newState = new LifeState;
    oldState = screen.state;
    screen.state = newState;
    if (oldState != null) {
      return delete oldState;
    }
  };
  randomizeScreen = function(screen, range_x, range_y) {
    var x, y, _i, _len, _results;
    clearScreen(screen);
    _results = [];
    for (_i = 0, _len = range_x.length; _i < _len; _i++) {
      x = range_x[_i];
      _results.push((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = range_y.length; _i < _len; _i++) {
          y = range_y[_i];
          _results.push(Math.random() > 0.5 ? screen.state.spawn(x, y) : void 0);
        }
        return _results;
      })());
    }
    return _results;
  };
  $(document).ready(function() {
    var screen, _i, _j, _results, _results2;
    screen = new LifeScreen('#screen', new LifeState);
    randomizeScreen(screen, (function() {
      _results = [];
      for (_i = 50; _i <= 100; _i++){ _results.push(_i); }
      return _results;
    }).call(this), (function() {
      _results2 = [];
      for (_j = 25; _j <= 50; _j++){ _results2.push(_j); }
      return _results2;
    }).call(this));
    setInterval((function() {
      return $('#fps').text(screen.realFPS);
    }), 1000);
    setInterval((function() {
      return $('#tickFps').text(screen.tickFPS);
    }), 1000);
    $('#tick').click(function() {
      screen.tick();
      return false;
    });
    $('#toggle').click(function() {
      screen.toggle();
      return false;
    });
    $('#clear').click(function() {
      clearScreen(screen);
      return false;
    });
    $('#randomize').click(function() {
      var _i, _j, _results, _results2;
      randomizeScreen(screen, (function() {
        _results = [];
        for (_i = 50; _i <= 100; _i++){ _results.push(_i); }
        return _results;
      }).call(this), (function() {
        _results2 = [];
        for (_j = 25; _j <= 50; _j++){ _results2.push(_j); }
        return _results2;
      }).call(this));
      return false;
    });
    $('#speed').change(function() {
      var new_speed;
      new_speed = parseInt($(this).val());
      if (new_speed > 0) {
        return screen.speed = new_speed;
      }
    });
    $('#left').click(function() {
      return screen.pan(1, 0);
    });
    $('#right').click(function() {
      return screen.pan(-1, 0);
    });
    $('#up').click(function() {
      return screen.pan(0, 1);
    });
    $('#down').click(function() {
      return screen.pan(0, -1);
    });
    $('#zoomin').click(function() {
      return screen.zoom(150);
    });
    $('#zoomout').click(function() {
      return screen.zoom(50);
    });
    return $('#screen').mousewheel(function(event, delta) {
      return screen.zoom(100 + (delta * -1 * 10));
    });
  });
}).call(this);
