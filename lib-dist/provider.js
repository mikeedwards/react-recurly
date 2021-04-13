"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RecurlyContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var RecurlyContext = _react["default"].createContext({
  recurly: null
});

exports.RecurlyContext = RecurlyContext;
var Provider = RecurlyContext.Provider;
/**
 * This is the top-level component for `react-recurly`, and must wrap any other
 * `react-recurly` component you will use. It is responsible for creating a `Recurly.js`
 * instance for any descendant components to interact with.
 *
 * This component accepts your `publicKey` and other configuration options for Recurly.js as props.
 */

var RecurlyProvider = /*#__PURE__*/function (_React$Component) {
  _inherits(RecurlyProvider, _React$Component);

  var _super = _createSuper(RecurlyProvider);

  function RecurlyProvider(props) {
    var _this;

    _classCallCheck(this, RecurlyProvider);

    _this = _super.call(this, props);

    if (!_this.props.publicKey) {
      throw new Error("\n        Please pass your 'publicKey' value to this RecurlyProvider.\n        Example: <RecurlyProvider publicKey=\"MY_PUBLIC_KEY\">\n      ");
    } // TODO: ensure proper shape?


    if (!window.recurly || !window.recurly.Recurly) {
      throw new Error("\n        Please load Recurly.js (https://js.recurly.com/v4/recurly.js) on this page prior to\n        loading your React application.\n      ");
    }

    var _this$props = _this.props,
        children = _this$props.children,
        options = _objectWithoutProperties(_this$props, ["children"]);

    _this._recurly = fetchRecurlyInstance(options);

    if (!RecurlyProvider.hasReportedInitialization && _this._recurly.report) {
      _this._recurly.ready(function () {
        _this._recurly.report('react-recurly', {
          version: _package.version
        });
      });

      RecurlyProvider.hasReportedInitialization = true;
    }

    return _this;
  }

  _createClass(RecurlyProvider, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(Provider, {
        value: {
          recurly: this._recurly
        }
      }, this.props.children);
    }
  }]);

  return RecurlyProvider;
}(_react["default"].Component);

exports["default"] = RecurlyProvider;

_defineProperty(RecurlyProvider, "propTypes", {
  /**
   * Your Recurly public key. See
   * [API Access](https://app.recurly.com/go/developer/api_access).
   */
  publicKey: _propTypes["default"].string,

  /**
   * Sets a default currency
   */
  currency: _propTypes["default"].string,

  /**
   * Adds additional field requirements for tokenization. ex: ['cvv']
   */
  required: _propTypes["default"].arrayOf(_propTypes["default"].string),

  /**
   * API request timeout in ms
   */
  timeout: _propTypes["default"].number,

  /**
   * Fraud configuration. See the
   * [Recurly-js docs on fraud configuration](https://developers.recurly.com/reference/recurly-js/index.html#fraud)
   */
  fraud: _propTypes["default"].shape({
    kount: _propTypes["default"].shape({
      dataCollector: _propTypes["default"].bool
    }),
    braintree: _propTypes["default"].shape({
      deviceData: _propTypes["default"].string
    }),
    litle: _propTypes["default"].shape({
      sessionId: _propTypes["default"].string
    })
  })
});

_defineProperty(RecurlyProvider, "defaultProps", {
  publicKey: ''
});

;
/**
 * Retrieves a recurly instance from a cache on the Recurly class, or creates one
 * if none found on the cache key. This is used when the Provider is being
 * regularly re-instantiated
 *
 * @param  {object} options instance instantiation options
 * @return {Recurly}
 */

function fetchRecurlyInstance(options) {
  var cache = window.recurly.Recurly.__instanceCache = window.recurly.Recurly.__instanceCache || {};
  var key = JSON.stringify(options);
  var recurly = cache[key] || new window.recurly.Recurly();
  recurly.configure(options);
  cache[key] = recurly;
  return recurly;
}