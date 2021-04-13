"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _provider = require("./provider");

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

var ThreeDSecureAction = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ThreeDSecureAction, _React$PureComponent);

  var _super = _createSuper(ThreeDSecureAction);

  function ThreeDSecureAction(props, context) {
    var _this;

    _classCallCheck(this, ThreeDSecureAction);

    _this = _super.call(this, props, context);

    if (!context || !context.recurly) {
      throw new Error('<ThreeDSecureAction> must be within a <RecurlyProvider> tree.');
    }

    var actionTokenId = props.actionTokenId;
    _this._container = _react["default"].createRef();
    _this._risk = _this.context.recurly.Risk();
    _this._threeDSecure = _this._risk.ThreeDSecure({
      actionTokenId: actionTokenId
    });

    _this._threeDSecure.on('token', function () {
      var _this$props;

      return (_this$props = _this.props).onToken.apply(_this$props, arguments);
    });

    _this._threeDSecure.on('error', function () {
      var _this$props2;

      return (_this$props2 = _this.props).onError.apply(_this$props2, arguments);
    });

    return _this;
  }

  _createClass(ThreeDSecureAction, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._threeDSecure.attach(this._container.current);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: this.props.id,
        className: this.props.className,
        ref: this._container
      });
    }
  }]);

  return ThreeDSecureAction;
}(_react["default"].PureComponent);

exports["default"] = ThreeDSecureAction;

_defineProperty(ThreeDSecureAction, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,

  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,

  /**
   * `three_d_secure_action_token_id` returned by the Recurly API when 3-D Secure
   * authentication is required for a transaction.
   */
  actionTokenId: _propTypes["default"].string,

  /**
   * Called when the user has completed the 3D Secure flow
   * @type {ThreeDSecureAction~onToken}
   */

  /**
   * @callback ThreeDSecureAction~onToken
   * @param {ThreeDSecureActionResultToken}
   */
  onToken: _propTypes["default"].func,

  /**
   * Called when an error is encountered
   * @type {ThreeDSecureAction~onError}
   */

  /**
   * @callback ThreeDSecureAction~onError
   * @param {RecurlyError}
   */
  onError: _propTypes["default"].func
});

_defineProperty(ThreeDSecureAction, "defaultProps", {
  id: undefined,
  className: undefined,
  actionTokenId: '',
  onToken: function onToken() {},
  onError: function onError(e) {
    throw e;
  }
});

_defineProperty(ThreeDSecureAction, "contextType", _provider.RecurlyContext);

;