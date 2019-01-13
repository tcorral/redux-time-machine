"use strict";
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
exports.createTimeMachineNode = function (config) {
    if (config.actionCreators) {
        delete config.actionCreators.ActionCreators;
        config.actionCreators = __assign({}, config.actionCreators, redux_undo_1.ActionCreators);
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
    config.reducers = createUndoableReducers(config.reducers, config.initialState);
    var stateNode = redux_hub_1.stateHub.createNode(config);
    var originalGetState = stateNode.getState;
    stateNode.getState = function () {
        return (originalGetState.apply(stateNode).present || originalGetState.apply(stateNode));
    };
    return stateNode;
};
