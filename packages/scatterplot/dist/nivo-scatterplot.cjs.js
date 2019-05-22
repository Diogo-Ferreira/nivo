'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactMotion = require('react-motion');
var core = require('@nivo/core');
var axes = require('@nivo/axes');
var legends = require('@nivo/legends');
var voronoi = require('@nivo/voronoi');
var compose = _interopDefault(require('recompose/compose'));
var defaultProps = _interopDefault(require('recompose/defaultProps'));
var withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var pure = _interopDefault(require('recompose/pure'));
var setDisplayName = _interopDefault(require('recompose/setDisplayName'));
var colors = require('@nivo/colors');
var scales = require('@nivo/scales');
var PropTypes = _interopDefault(require('prop-types'));
var tooltip = require('@nivo/tooltip');

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ScatterPlotItem = function ScatterPlotItem(_ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      color = _ref.color,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      symbol = _ref.symbol,
      point = _ref.point;
  return React__default.createElement(symbol, {
    x: x,
    y: y,
    size: size,
    color: color,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    point: point
  });
};
var DefaultSymbol = function DefaultSymbol(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      size = _ref2.size,
      color = _ref2.color,
      onMouseEnter = _ref2.onMouseEnter,
      onMouseMove = _ref2.onMouseMove,
      onMouseLeave = _ref2.onMouseLeave,
      onClick = _ref2.onClick;
  return React__default.createElement("circle", {
    cx: x,
    cy: y,
    r: size / 2,
    fill: color,
    onMouseEnter: onMouseEnter,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: onClick
  });
};
var commonProps = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func
};
DefaultSymbol.propTypes = commonProps;
ScatterPlotItem.propTypes = _objectSpread({
  point: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
      serie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }).isRequired
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
}, commonProps, {
  symbol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  theme: PropTypes.object.isRequired
});
var enhance = compose(withPropsOnChange(['point', 'onMouseEnter', 'onMouseMove', 'onMouseLeave', 'onClick'], function (_ref3) {
  var point = _ref3.point,
      _onMouseEnter = _ref3.onMouseEnter,
      _onMouseMove = _ref3.onMouseMove,
      _onMouseLeave = _ref3.onMouseLeave,
      _onClick = _ref3.onClick;
  return {
    onMouseEnter: function onMouseEnter(event) {
      return _onMouseEnter(point, event);
    },
    onMouseMove: function onMouseMove(event) {
      return _onMouseMove(point, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return _onMouseLeave(point, event);
    },
    onClick: function onClick(event) {
      return _onClick(point, event);
    }
  };
}), pure);
var ScatterPlotItem$1 = enhance(ScatterPlotItem);

var ScatterPlotPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]).isRequired
    })).isRequired
  })).isRequired,
  xScale: scales.scalePropType.isRequired,
  yScale: scales.scalePropType.isRequired,
  computedData: PropTypes.shape({
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  }).isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'points', 'markers', 'mesh', 'legends']), PropTypes.func])).isRequired,
  axisTop: axes.axisPropType,
  axisRight: axes.axisPropType,
  axisBottom: axes.axisPropType,
  axisLeft: axes.axisPropType,
  enableGridX: PropTypes.bool.isRequired,
  enableGridY: PropTypes.bool.isRequired,
  symbolSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
  symbolShape: PropTypes.oneOfType([PropTypes.oneOf(['circle', 'square'])]).isRequired,
  symbol: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.oneOf(['x', 'y']).isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    style: PropTypes.object
  })),
  colors: colors.ordinalColorsPropType.isRequired,
  getColor: PropTypes.func.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  useMesh: PropTypes.bool.isRequired,
  debugMesh: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired,
  pixelRatio: PropTypes.number.isRequired
};
var ScatterPlotDefaultProps = {
  xScale: {
    type: 'linear',
    min: 0,
    max: 'auto'
  },
  yScale: {
    type: 'linear',
    min: 0,
    max: 'auto'
  },
  layers: ['grid', 'axes', 'points', 'markers', 'mesh', 'legends'],
  axisBottom: {},
  axisLeft: {},
  enableGridX: true,
  enableGridY: true,
  symbolSize: 6,
  symbolShape: 'circle',
  symbol: DefaultSymbol,
  colors: {
    scheme: 'nivo'
  },
  isInteractive: true,
  useMesh: false,
  debugMesh: false,
  enableStackTooltip: true,
  onMouseEnter: core.noop,
  onMouseMove: core.noop,
  onMouseLeave: core.noop,
  onClick: core.noop,
  legends: [],
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
};

var _this = undefined;
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
var commonEnhancers = [core.withTheme(), core.withDimensions(), core.withMotion(), withPropsOnChange(['colors'], function (_ref) {
  var colors$1 = _ref.colors;
  return {
    getColor: colors.getOrdinalColorScale(colors$1, 'serie.id')
  };
}), withPropsOnChange(['symbolSize'], function (_ref2) {
  var symbolSize = _ref2.symbolSize;
  return {
    getSymbolSize: core.getAccessorOrValue(symbolSize)
  };
}), withPropsOnChange(['data', 'xScale', 'yScale', 'width', 'height'], function (_ref3) {
  var data = _ref3.data,
      xScale = _ref3.xScale,
      yScale = _ref3.yScale,
      width = _ref3.width,
      height = _ref3.height;
  var computedData = scales.computeXYScalesForSeries(data, xScale, yScale, width, height);
  var points = computedData.series.reduce(function (agg, serie) {
    return [].concat(_toConsumableArray(agg), _toConsumableArray(serie.data.map(function (d, i) {
      return {
        id: "".concat(serie.id, ".").concat(i),
        x: d.position.x,
        y: d.position.y,
        data: _objectSpread$1({}, d.data, {
          serie: serie,
          id: "".concat(serie.id, ".").concat(i)
        })
      };
    })));
  }, []);
  return {
    computedData: computedData,
    points: points
  };
})];
var enhanceSvg = function enhanceSvg(Component) {
  return compose.apply(void 0, [defaultProps(ScatterPlotDefaultProps)].concat(commonEnhancers, [pure, setDisplayName('ScatterPlot')]))(Component);
};
var enhanceCanvas = function enhanceCanvas(Component) {
  return compose.apply(void 0, [defaultProps(_objectSpread$1({}, ScatterPlotDefaultProps, {
    symbol: function symbol(ctx, point, getSymbolSize, getColor) {
      _this.ctx.beginPath();
      _this.ctx.arc(point.x, point.y, getSymbolSize(point.data) / 2, 0, 2 * Math.PI);
      _this.ctx.fillStyle = getColor(point.data);
      _this.ctx.fill();
    }
  }))].concat(commonEnhancers, [withPropsOnChange(['points', 'width', 'height', 'debugMesh'], function (_ref4) {
    var points = _ref4.points,
        width = _ref4.width,
        height = _ref4.height,
        debugMesh = _ref4.debugMesh;
    var points2d = voronoi.computeMeshPoints({
      points: points
    });
    return voronoi.computeMesh({
      points: points2d,
      width: width,
      height: height,
      debug: debugMesh
    });
  }), pure, setDisplayName('ScatterPlotCanvas')]))(Component);
};

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ScatterPlotTooltip = function ScatterPlotTooltip(_ref) {
  var data = _ref.point.data,
      color = _ref.color,
      format = _ref.format,
      theme = _ref.theme,
      tooltip$1 = _ref.tooltip;
  return React__default.createElement(tooltip.BasicTooltip, {
    id: data.serie.id,
    value: "x: ".concat(data.x, ", y: ").concat(data.y),
    enableChip: true,
    color: color,
    theme: theme,
    format: format,
    renderContent: typeof tooltip$1 === 'function' ? tooltip$1.bind(null, _objectSpread$2({
      color: color
    }, data)) : null
  });
};
ScatterPlotTooltip.propTypes = {
  point: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
      serie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      }).isRequired
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  color: PropTypes.string.isRequired,
  format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tooltip: PropTypes.func,
  theme: PropTypes.object.isRequired
};

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ScatterPlot =
function (_Component) {
  _inherits(ScatterPlot, _Component);
  function ScatterPlot() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, ScatterPlot);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScatterPlot)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$3(_assertThisInitialized(_this), "showTooltip", function (showTooltip, point, event) {
      var _this$props = _this.props,
          tooltipFormat = _this$props.tooltipFormat,
          tooltip = _this$props.tooltip,
          theme = _this$props.theme,
          getColor = _this$props.getColor;
      showTooltip(React__default.createElement(ScatterPlotTooltip, {
        point: point,
        color: getColor(point.data),
        format: tooltipFormat,
        tooltip: tooltip,
        theme: theme
      }), event);
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleMouseEnter", function (showTooltip) {
      return function (point, event) {
        var _this$props2 = _this.props,
            isInteractive = _this$props2.isInteractive,
            onMouseEnter = _this$props2.onMouseEnter;
        if (!isInteractive) return;
        onMouseEnter && onMouseEnter(point, event);
        _this.showTooltip(showTooltip, point, event);
      };
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleMouseMove", function (showTooltip) {
      return function (point, event) {
        var _this$props3 = _this.props,
            isInteractive = _this$props3.isInteractive,
            onMouseMove = _this$props3.onMouseMove;
        if (!isInteractive) return;
        onMouseMove && onMouseMove(point, event);
        _this.showTooltip(showTooltip, point, event);
      };
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleMouseLeave", function (hideTooltip) {
      return function (point, event) {
        var _this$props4 = _this.props,
            isInteractive = _this$props4.isInteractive,
            onMouseLeave = _this$props4.onMouseLeave;
        if (!isInteractive) return;
        onMouseLeave && onMouseLeave(point, event);
        hideTooltip();
      };
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleClick", function (point, event) {
      var _this$props5 = _this.props,
          isInteractive = _this$props5.isInteractive,
          onClick = _this$props5.onClick;
      if (!isInteractive || onClick === undefined) return;
      onClick(point.data, event);
    });
    return _this;
  }
  _createClass(ScatterPlot, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props6 = this.props,
          data = _this$props6.data,
          computedData = _this$props6.computedData,
          points = _this$props6.points,
          layers = _this$props6.layers,
          margin = _this$props6.margin,
          width = _this$props6.width,
          height = _this$props6.height,
          outerWidth = _this$props6.outerWidth,
          outerHeight = _this$props6.outerHeight,
          axisTop = _this$props6.axisTop,
          axisRight = _this$props6.axisRight,
          axisBottom = _this$props6.axisBottom,
          axisLeft = _this$props6.axisLeft,
          enableGridX = _this$props6.enableGridX,
          enableGridY = _this$props6.enableGridY,
          markers = _this$props6.markers,
          theme = _this$props6.theme,
          getSymbolSize = _this$props6.getSymbolSize,
          getColor = _this$props6.getColor,
          symbol = _this$props6.symbol,
          animate = _this$props6.animate,
          motionStiffness = _this$props6.motionStiffness,
          motionDamping = _this$props6.motionDamping,
          isInteractive = _this$props6.isInteractive,
          useMesh = _this$props6.useMesh,
          debugMesh = _this$props6.debugMesh,
          legends$1 = _this$props6.legends;
      var xScale = computedData.xScale,
          yScale = computedData.yScale;
      var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness
      };
      var legendData = data.map(function (serie) {
        return {
          id: serie.id,
          label: serie.id,
          color: getColor({
            serie: serie
          })
        };
      });
      return React__default.createElement(core.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        var onMouseEnter = _this2.handleMouseEnter(showTooltip);
        var onMouseMove = _this2.handleMouseMove(showTooltip);
        var onMouseLeave = _this2.handleMouseLeave(hideTooltip);
        var layerById = {
          grid: React__default.createElement(axes.Grid, {
            key: "grid",
            width: width,
            height: height,
            xScale: enableGridX ? xScale : null,
            yScale: enableGridY ? yScale : null,
            xValues: 4,
            yValues: 4
          }),
          axes: React__default.createElement(axes.Axes, {
            key: "axes",
            xScale: xScale,
            yScale: yScale,
            width: width,
            height: height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft
          }),
          markers: React__default.createElement(core.CartesianMarkers, {
            key: "markers",
            markers: markers,
            width: width,
            height: height,
            xScale: xScale,
            yScale: yScale,
            theme: theme
          }),
          mesh: null,
          legends: legends$1.map(function (legend, i) {
            return React__default.createElement(legends.BoxLegendSvg, _extends({
              key: i
            }, legend, {
              containerWidth: width,
              containerHeight: height,
              data: legendData,
              theme: theme
            }));
          })
        };
        if (animate === true) {
          layerById.points = React__default.createElement(reactMotion.TransitionMotion, {
            key: "points",
            styles: points.map(function (point) {
              return {
                key: point.id,
                data: point,
                style: {
                  x: reactMotion.spring(point.x, springConfig),
                  y: reactMotion.spring(point.y, springConfig),
                  size: reactMotion.spring(getSymbolSize(point.data), springConfig)
                }
              };
            })
          }, function (interpolatedStyles) {
            return React__default.createElement("g", null, interpolatedStyles.map(function (_ref2) {
              var key = _ref2.key,
                  style = _ref2.style,
                  point = _ref2.data;
              return React__default.createElement(ScatterPlotItem$1, {
                key: key,
                point: point,
                x: style.x,
                y: style.y,
                size: style.size,
                symbol: symbol,
                color: getColor(point.data),
                onMouseEnter: onMouseEnter,
                onMouseMove: onMouseMove,
                onMouseLeave: onMouseLeave,
                onClick: _this2.handleClick,
                theme: theme
              });
            }));
          });
        } else {
          layerById.points = points.map(function (point) {
            return React__default.createElement(ScatterPlotItem$1, {
              key: point.id,
              point: point,
              x: point.x,
              y: point.y,
              size: getSymbolSize(point.data),
              color: getColor(point.data),
              symbol: symbol,
              data: point.data,
              onMouseEnter: onMouseEnter,
              onMouseMove: onMouseMove,
              onMouseLeave: onMouseLeave,
              onClick: _this2.handleClick,
              theme: theme
            });
          });
        }
        if (isInteractive === true && useMesh === true) {
          layerById.mesh = React__default.createElement(voronoi.Mesh, {
            key: "mesh",
            nodes: points,
            width: width,
            height: height,
            onMouseEnter: onMouseEnter,
            onMouseMove: onMouseMove,
            onMouseLeave: onMouseLeave,
            onClick: _this2.handleClick,
            debug: debugMesh
          });
        }
        return React__default.createElement(core.SvgWrapper, {
          width: outerWidth,
          height: outerHeight,
          margin: margin,
          theme: theme
        }, layers.map(function (layer, i) {
          if (typeof layer === 'function') {
            return React__default.createElement(React.Fragment, {
              key: i
            }, layer(_objectSpread$3({}, _this2.props, {
              xScale: xScale,
              yScale: yScale
            })));
          }
          return layerById[layer];
        }));
      });
    }
  }]);
  return ScatterPlot;
}(React.Component);
_defineProperty$3(ScatterPlot, "propTypes", ScatterPlotPropTypes);
var ScatterPlot$1 = enhanceSvg(ScatterPlot);

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var ResponsiveScatterPlot = function ResponsiveScatterPlot(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(ScatterPlot$1, _extends$1({
      width: width,
      height: height
    }, props));
  });
};

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }
function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
  return nodes.find(function (node) {
    return core.isCursorInRect(node.x + margin.left - node.size / 2, node.y + margin.top - node.size / 2, node.size, node.size, x, y);
  });
};
var ScatterPlotCanvas =
function (_Component) {
  _inherits$1(ScatterPlotCanvas, _Component);
  function ScatterPlotCanvas() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck$1(this, ScatterPlotCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn$1(this, (_getPrototypeOf2 = _getPrototypeOf$1(ScatterPlotCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$4(_assertThisInitialized$1(_this), "state", {});
    _defineProperty$4(_assertThisInitialized$1(_this), "handleMouseEnter", function () {});
    _defineProperty$4(_assertThisInitialized$1(_this), "getPointForMouseEvent", function (event) {
      var _this$props = _this.props,
          points = _this$props.points,
          margin = _this$props.margin,
          width = _this$props.width,
          height = _this$props.height,
          useMesh = _this$props.useMesh,
          delaunay = _this$props.delaunay,
          onMouseMove = _this$props.onMouseMove,
          onMouseLeave = _this$props.onMouseLeave;
      var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
          _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
          x = _getRelativeCursor2[0],
          y = _getRelativeCursor2[1];
      var pointIndex;
      var point;
      if (useMesh === true) {
        if (core.isCursorInRect(margin.left, margin.top, width, height, x, y)) {
          pointIndex = delaunay.find(x - margin.left, y - margin.top);
          point = points[pointIndex];
        } else {
          pointIndex = null;
          point = null;
        }
      } else {
        point = findNodeUnderCursor(points, margin, x, y);
      }
      if (point && onMouseMove !== undefined) {
        onMouseMove(point, event);
      } else if (!point && _this.state.point && onMouseLeave !== undefined) {
        onMouseLeave(_this.state.point, event);
      }
      _this.setState({
        pointIndex: pointIndex,
        point: point
      });
      return point;
    });
    _defineProperty$4(_assertThisInitialized$1(_this), "handleMouseHover", function (showTooltip, hideTooltip) {
      return function (event) {
        var point = _this.getPointForMouseEvent(event);
        if (point) {
          var _this$props2 = _this.props,
              theme = _this$props2.theme,
              tooltipFormat = _this$props2.tooltipFormat,
              tooltip = _this$props2.tooltip,
              getColor = _this$props2.getColor;
          showTooltip(React__default.createElement(ScatterPlotTooltip, {
            point: point,
            color: getColor(point.data),
            format: tooltipFormat,
            tooltip: tooltip,
            theme: theme
          }), event);
        } else {
          hideTooltip();
        }
      };
    });
    _defineProperty$4(_assertThisInitialized$1(_this), "handleMouseLeave", function (hideTooltip) {
      return function () {
        hideTooltip();
      };
    });
    _defineProperty$4(_assertThisInitialized$1(_this), "handleClick", function (event) {
      var point = _this.getPointForMouseEvent(event);
      if (point !== undefined && point !== null) {
        _this.props.onClick(point.data, event);
      }
    });
    return _this;
  }
  _createClass$1(ScatterPlotCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(props) {
      if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
        return true;
      } else {
        this.draw(props);
        return false;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "draw",
    value: function draw(props) {
      var _this2 = this;
      var data = props.data,
          computedData = props.computedData,
          points = props.points,
          width = props.width,
          height = props.height,
          outerWidth = props.outerWidth,
          outerHeight = props.outerHeight,
          pixelRatio = props.pixelRatio,
          margin = props.margin,
          axisTop = props.axisTop,
          axisRight = props.axisRight,
          axisBottom = props.axisBottom,
          axisLeft = props.axisLeft,
          enableGridX = props.enableGridX,
          enableGridY = props.enableGridY,
          useMesh = props.useMesh,
          debugMesh = props.debugMesh,
          voronoi$1 = props.voronoi,
          theme = props.theme,
          getSymbolSize = props.getSymbolSize,
          getColor = props.getColor,
          symbol = props.symbol,
          legends$1 = props.legends;
      var xScale = computedData.xScale,
          yScale = computedData.yScale;
      this.surface.width = outerWidth * pixelRatio;
      this.surface.height = outerHeight * pixelRatio;
      this.ctx.scale(pixelRatio, pixelRatio);
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(0, 0, outerWidth, outerHeight);
      this.ctx.translate(margin.left, margin.top);
      this.ctx.strokeStyle = '#dddddd';
      enableGridX && axes.renderGridLinesToCanvas(this.ctx, {
        width: width,
        height: height,
        scale: xScale,
        axis: 'x'
      });
      enableGridY && axes.renderGridLinesToCanvas(this.ctx, {
        width: width,
        height: height,
        scale: yScale,
        axis: 'y'
      });
      this.ctx.strokeStyle = '#000000';
      axes.renderAxesToCanvas(this.ctx, {
        xScale: xScale,
        yScale: yScale,
        width: width,
        height: height,
        top: axisTop,
        right: axisRight,
        bottom: axisBottom,
        left: axisLeft,
        theme: theme
      });
      points.forEach(function (point) {
        symbol(_this2.ctx, point, getSymbolSize, getColor);
      });
      if (useMesh === true && debugMesh === true) {
        var pointIndex = this.state.pointIndex;
        voronoi.renderVoronoiToCanvas(this.ctx, voronoi$1);
        if (pointIndex !== null) {
          voronoi.renderVoronoiCellToCanvas(this.ctx, voronoi$1, pointIndex);
        }
      }
      var legendData = data.map(function (serie) {
        return {
          id: serie.id,
          label: serie.id,
          color: getColor({
            serie: serie
          })
        };
      });
      legends$1.forEach(function (legend) {
        legends.renderLegendToCanvas(_this2.ctx, _objectSpread$4({}, legend, {
          data: legendData,
          containerWidth: width,
          containerHeight: height,
          theme: theme
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props,
          outerWidth = _this$props3.outerWidth,
          outerHeight = _this$props3.outerHeight,
          pixelRatio = _this$props3.pixelRatio,
          isInteractive = _this$props3.isInteractive,
          theme = _this$props3.theme;
      return React__default.createElement(core.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: false
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        return React__default.createElement("canvas", {
          ref: function ref(surface) {
            _this3.surface = surface;
          },
          width: outerWidth * pixelRatio,
          height: outerHeight * pixelRatio,
          style: {
            width: outerWidth,
            height: outerHeight
          },
          onMouseEnter: _this3.handleMouseHover(showTooltip, hideTooltip),
          onMouseMove: _this3.handleMouseHover(showTooltip, hideTooltip),
          onMouseLeave: _this3.handleMouseLeave(hideTooltip),
          onClick: _this3.handleClick
        });
      });
    }
  }]);
  return ScatterPlotCanvas;
}(React.Component);
ScatterPlotCanvas.propTypes = ScatterPlotPropTypes;
var ScatterPlotCanvas$1 = enhanceCanvas(ScatterPlotCanvas);

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var ResponsiveScatterPlotCanvas = function ResponsiveScatterPlotCanvas(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(ScatterPlotCanvas$1, _extends$2({
      width: width,
      height: height
    }, props));
  });
};

exports.ResponsiveScatterPlot = ResponsiveScatterPlot;
exports.ResponsiveScatterPlotCanvas = ResponsiveScatterPlotCanvas;
exports.ScatterPlot = ScatterPlot$1;
exports.ScatterPlotCanvas = ScatterPlotCanvas$1;
exports.ScatterPlotDefaultProps = ScatterPlotDefaultProps;
exports.ScatterPlotPropTypes = ScatterPlotPropTypes;
