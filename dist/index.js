"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_hub_1 = require("redux-hub");
// @ts-ignore
var redux_undo_1 = __importStar(require("redux-undo"));
// @ts-ignore
var uuidv4 = __importStar(require("uuid/v4"));
var StateHubTimeMachine = /** @class */ (function (_super) {
    __extends(StateHubTimeMachine, _super);
    function StateHubTimeMachine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.node = function (scopeName) {
            if (scopeName === void 0) { scopeName = uuidv4(); }
            var hubModel = new redux_hub_1.HubModel(scopeName);
            var executionTrack = {};
            var create = function () {
                if (!executionTrack.actions || !executionTrack.reducers) {
                    throw new Error('Unable to create node. Actions and reducers are required.');
                }
                if (!executionTrack.state) {
                    hubModel.state({});
                }
                var stateNode = hubModel.create();
                var originalGetState = stateNode.getState;
                stateNode.getState = function () {
                    return (originalGetState.apply(stateNode).present ||
                        originalGetState.apply(stateNode));
                };
                return stateNode;
            };
            var set = function (method, data, hook) {
                executionTrack[method] = true;
                if (method === 'state') {
                    _this.state = data;
                }
                if (method === 'actions') {
                    delete data.ActionCreators;
                    data = __assign({}, data, redux_undo_1.ActionCreators);
                }
                if (method === 'reducers') {
                    if (!executionTrack.state) {
                        throw new Error('Unable to set reducers before setting a initial state.');
                    }
                    var createUndoableReducers = function (reducers, initialState) {
                        var undoableReducers = {};
                        for (var key in reducers) {
                            if (reducers.hasOwnProperty(key)) {
                                undoableReducers[key] = redux_undo_1.default(reducers[key], {
                                    filter: redux_undo_1.distinctState(),
                                    initialState: initialState,
                                });
                            }
                        }
                        for (var key in redux_undo_1.ActionTypes) {
                            if (redux_undo_1.ActionTypes.hasOwnProperty(key)) {
                                var actionType = redux_undo_1.ActionTypes[key];
                                undoableReducers[actionType] = redux_undo_1.default(function (state) { return state; }, {
                                    filter: redux_undo_1.distinctState(),
                                    initialState: initialState,
                                });
                            }
                        }
                        return undoableReducers;
                    };
                    data = createUndoableReducers(data, _this.state);
                }
                hubModel[method](data);
                return {
                    create: create,
                    set: set,
                };
            };
            return {
                create: create,
                set: set,
            };
        };
        return _this;
    }
    return StateHubTimeMachine;
}(redux_hub_1.StateHub));
exports.StateHubTimeMachine = StateHubTimeMachine;
