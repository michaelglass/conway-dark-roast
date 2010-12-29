(function() {
  var randomizeLife;
  $(document).ready(function() {
    var canvas, screen, state, _i, _j, _ref, _ref2, _results, _results2;
    state = new LifeState;
    canvas = $('#screen');
    randomizeLife(state, (function() {
      _results = [];
      for (var _i = 0, _ref = Math.ceil(canvas.width() / 8); 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i += 1 : _i -= 1){ _results.push(_i); }
      return _results;
    }).call(this), (function() {
      _results2 = [];
      for (var _j = 0, _ref2 = Math.ceil(canvas.height() / 8); 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; 0 <= _ref2 ? _j += 1 : _j -= 1){ _results2.push(_j); }
      return _results2;
    }).call(this));
    screen = new LifeScreen('#screen', state);
    $('#tick').click(function() {
      screen.tick();
      return false;
    });
    $('#toggle').click(function() {
      screen.toggle();
      return false;
    });
    $('#clear').click(function() {
      screen.stop();
      delete screen.state;
      screen.state = new LifeState;
      screen.refreshCells();
      return false;
    });
    return $('#randomize').click(function() {
      var _i, _j, _ref, _ref2, _results, _results2;
      screen.stop();
      delete screen.tate;
      screen.state = new LifeState;
      randomizeLife(screen.state, (function() {
        _results = [];
        for (var _i = 0, _ref = Math.ceil(canvas.width() / 8); 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i += 1 : _i -= 1){ _results.push(_i); }
        return _results;
      }).call(this), (function() {
        _results2 = [];
        for (var _j = 0, _ref2 = Math.ceil(canvas.height() / 8); 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; 0 <= _ref2 ? _j += 1 : _j -= 1){ _results2.push(_j); }
        return _results2;
      }).call(this));
      screen.refreshCells();
      return false;
    });
  });
  randomizeLife = function(state, range_x, range_y) {
    var x, y, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = range_x.length; _i < _len; _i++) {
      x = range_x[_i];
      _results.push((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = range_y.length; _i < _len; _i++) {
          y = range_y[_i];
          _results.push(Math.random() > 0.5 ? state.spawn(x, y) : void 0);
        }
        return _results;
      })());
    }
    return _results;
  };
}).call(this);
