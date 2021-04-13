"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useCheckoutPricing;
exports.throwError = throwError;

var _react = require("react");

var _useRecurly = _interopRequireDefault(require("./use-recurly"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @typedef {Object} address
 * @property {String} country
 * @property {String} postalCode
 * @property {String} vatNumber
 */

/**
 * useCheckoutPricing interface
 * @typedef {Object} useCheckoutPricingInterface
 * @property {Array} subscriptions
 * @property {Array} adjustments
 * @property {String} currency
 * @property {address} address
 * @property {address} shippingAddress
 * @property {String} coupon
 * @property {String} giftCard
 * @property {Object} tax
 */

/**
 * A custom hook for interfacing with recurly.js' checkoutPricing API meant to mimic the call signature, return
 * type, and behavior of `react.useState`.
 *
 * Accepts an `initialInputs` param (same as useState) and an error handling function.
 *
 * Returns a tuple with an output object and an update function similar to useState.
 *
 * @typedef {Object} output
 * @property {Object} price
 * @property {Object} pricing
 * @property {Boolean} loading
 *
 * @typedef {Function} setPricing
 * @typedef {[output, setPricing]} useCheckoutPricingInstance
 *
 * @param {PricingInput} useCheckoutPricingInterface
 * @param {function} handleError
 * @returns {useCheckoutPricingInstance} useCheckoutPricingInstance
 */
function useCheckoutPricing(initialInputs) {
  var handleError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : throwError;
  var recurly = (0, _useRecurly["default"])();

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(initialInputs || {}),
      _useState4 = _slicedToArray(_useState3, 2),
      input = _useState4[0],
      setInput = _useState4[1];

  var _useState5 = (0, _react.useState)(recurly.Pricing.Checkout()),
      _useState6 = _slicedToArray(_useState5, 2),
      pricing = _useState6[0],
      setPricing = _useState6[1];

  (0, _react.useEffect)(function () {
    setLoading(true);

    var _input$subscriptions = input.subscriptions,
        subscriptions = _input$subscriptions === void 0 ? [] : _input$subscriptions,
        _input$adjustments = input.adjustments,
        adjustments = _input$adjustments === void 0 ? [] : _input$adjustments,
        restInputs = _objectWithoutProperties(input, ["subscriptions", "adjustments"]);

    var checkoutPricing = recurly.Pricing.Checkout();
    addSubscriptions(subscriptions, checkoutPricing).then(function () {
      checkoutPricing = addAdjustments(adjustments, checkoutPricing);
      checkoutPricing = addRestInputs(restInputs, checkoutPricing);
      checkoutPricing = checkoutPricing.reprice().done(function () {
        setPricing(checkoutPricing);
        setLoading(false);
      });
    });

    function addAdjustments(adjustments, checkoutPricing) {
      if (!adjustments.length) return checkoutPricing.reprice();
      return adjustments.reduce(function (checkoutPricing, adjustment) {
        return checkoutPricing.adjustment(adjustment)["catch"](handleError);
      }, checkoutPricing);
    }

    ;

    function addRestInputs(restInputs, checkoutPricing) {
      var restInputsEntries = Object.entries(restInputs);
      if (!restInputsEntries.length) return checkoutPricing.reprice();
      var PRICING_METHODS = checkoutPricing.pricing.PRICING_METHODS;
      var exclude = ['reset', 'remove', 'reprice', 'subscription', 'adjustment', 'addon', 'plan'];
      var permittedInputs = PRICING_METHODS.filter(function (method) {
        return !exclude.includes(method);
      });
      return restInputsEntries.reduce(function (acc, input) {
        var _input = _slicedToArray(input, 2),
            method = _input[0],
            value = _input[1];

        var shouldCallPricingMethod = value && permittedInputs.includes(method);
        return shouldCallPricingMethod ? acc[method](value)["catch"](handleError) : acc;
      }, checkoutPricing);
    }

    ;

    function addSubscriptions(subscriptions, checkoutPricing) {
      var _subscriptions$reduce = subscriptions.reduce(function (_ref, _ref2) {
        var checkoutPricing = _ref.checkoutPricing,
            subscriptionPricings = _ref.subscriptionPricings;
        var plan = _ref2.plan,
            tax = _ref2.tax,
            _ref2$addons = _ref2.addons,
            addons = _ref2$addons === void 0 ? [] : _ref2$addons,
            quantity = _ref2.quantity;
        var subscriptionPricing;

        if (restInputs.currency) {
          subscriptionPricing = recurly.Pricing.Subscription().currency(restInputs.currency).plan(plan, {
            quantity: quantity
          });
        } else {
          subscriptionPricing = recurly.Pricing.Subscription().plan(plan, {
            quantity: quantity
          });
        }

        if (addons.length) {
          subscriptionPricing = addAddons(addons, subscriptionPricing);
        }

        if (tax) {
          subscriptionPricing = subscriptionPricing.tax(tax);
        }

        subscriptionPricing = subscriptionPricing["catch"](handleError);
        return {
          checkoutPricing: checkoutPricing.subscription(subscriptionPricing.done())["catch"](handleError),
          subscriptionPricings: [].concat(_toConsumableArray(subscriptionPricings), [subscriptionPricing])
        };
      }, {
        checkoutPricing: checkoutPricing,
        subscriptionPricings: []
      }),
          subscriptionPricings = _subscriptions$reduce.subscriptionPricings;

      return Promise.all(subscriptionPricings);
    }

    ;

    function addAddons() {
      var addons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var subscriptionPricing = arguments.length > 1 ? arguments[1] : undefined;
      return addons.reduce(function (subscriptionPricing, _ref3) {
        var code = _ref3.code,
            quantity = _ref3.quantity;
        return subscriptionPricing.addon(code, {
          quantity: quantity
        });
      }, subscriptionPricing)["catch"](handleError);
    }

    ;
  }, [input, handleError, recurly.Pricing]);
  var pricingState = {
    price: pricing && (0, _cloneDeep["default"])(pricing.price) || {},
    loading: loading
  };
  return [pricingState, setInput, pricing];
}

;

function throwError(err) {
  throw err;
}

;