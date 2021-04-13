"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _elements = require("../elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var noop = function noop() {};

var extractOptions = function extractOptions(props) {
  var id = props.id,
      className = props.className,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      onReady = props.onReady,
      onSubmit = props.onSubmit,
      options = _objectWithoutProperties(props, ["id", "className", "onChange", "onBlur", "onFocus", "onReady", "onSubmit"]);

  return options;
};
/**
 * An [Element](https://developers.recurly.com/reference/recurly-js/#elements)
 * component which wraps its Recurly.js analogue, passing configuration props to the underlying
 * Recurly.js Element and allowing event binding using props.
 */


var Element = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Element, _React$PureComponent);

  var _super = _createSuper(Element);

  function Element(props, context) {
    var _this;

    _classCallCheck(this, Element);

    _this = _super.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this), "configureElement", (0, _memoizeOne["default"])(function (element, options) {
      return element && Object.keys(options).length > 0 && element.configure(options);
    }));

    var elementClassName = _this.constructor.elementClassName;

    if (!context || !context.elements) {
      throw new Error("<".concat(elementClassName, "> must be within an <Elements> tree."));
    }

    var _options = extractOptions(_this.props);

    var _element = _this._element = context.elements[elementClassName](_options);

    _this._container = _react["default"].createRef();

    _element.on('ready', function () {
      var _this$props;

      return (_this$props = _this.props).onReady.apply(_this$props, arguments);
    });

    _element.on('change', function () {
      var _this$props2;

      return (_this$props2 = _this.props).onChange.apply(_this$props2, arguments);
    });

    _element.on('blur', function () {
      var _this$props3;

      return (_this$props3 = _this.props).onBlur.apply(_this$props3, arguments);
    });

    _element.on('focus', function () {
      var _this$props4;

      return (_this$props4 = _this.props).onFocus.apply(_this$props4, arguments);
    });

    _element.on('submit', function () {
      var _this$props5;

      return (_this$props5 = _this.props).onSubmit.apply(_this$props5, arguments);
    });

    return _this;
  }

  _createClass(Element, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._element.attach(this._container.current);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._element.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var element = this._element,
          props = this.props;
      this.configureElement(element, extractOptions(props));
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: props.id,
        className: props.className,
        ref: this._container
      });
    }
  }]);

  return Element;
}(_react["default"].PureComponent);

exports["default"] = Element;

_defineProperty(Element, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,

  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,

  /**
   * Called when the state of the Element changes.
   */
  onChange: _propTypes["default"].func,

  /**
   * Called when a user blurs from the Element.
   */
  onBlur: _propTypes["default"].func,

  /**
   * Called when a user focuses on the Element.
   */
  onFocus: _propTypes["default"].func,

  /**
   * Called when the Element has finished initializing.
   */
  onReady: _propTypes["default"].func,

  /**
   * Called when a user presses the <kbd>enter</kbd> key while focused on the Element.
   */
  onSubmit: _propTypes["default"].func,

  /**
   * Set style attributes for the Element.
   * See [Styling Elements](https://developers.recurly.com/reference/recurly-js/#styling-elements)
   * for available options.
   */
  style: _propTypes["default"].object,

  /**
   * [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   * property to be applied to the outer iframe.
   */
  tabIndex: _propTypes["default"].string
});

_defineProperty(Element, "defaultProps", {
  id: undefined,
  className: undefined,
  onChange: function onChange(state) {},
  onBlur: noop,
  onFocus: noop,
  onReady: noop,
  onSubmit: noop,
  style: {},
  tabIndex: undefined
});

_defineProperty(Element, "contextType", _elements.RecurlyElementsContext);

;