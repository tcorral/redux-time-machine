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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('redux-time-machine', function () {
    describe('createTimeMachineNode', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'createTimeMachineNode',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('should return "test" as initial test value', function (done) {
            expect(timeMachineNode.getState().test).toEqual('test');
            done();
        });
    });
    describe('dispatching', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'dispatching',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('should return "test2" as test value on dispatching "test" action', function (done) {
            timeMachineNode.dispatchers.test();
            expect(timeMachineNode.getState().test).toBe('test2');
            done();
        });
    });
    describe('undo', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'undo',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('undo should set test state to "test"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.undo();
            expect(timeMachineNode.getState().test).toBe('test');
        });
    });
    describe('redo', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'redo',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('redo should set test state to "test2"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.undo();
            timeMachineNode.dispatchers.redo();
            expect(timeMachineNode.getState().test).toBe('test2');
        });
    });
    describe('jumpToPast index 0', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
                test2: function () { return ({
                    type: 'TEST2',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToPast1',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
                TEST2: function (state, action) {
                    return __assign({}, state, { test: 'test3' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('jumpToPast index 0 should return "test"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(0);
            expect(timeMachineNode.getState().test).toBe('test');
        });
    });
    describe('jumpToPast index 1', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
                test2: function () { return ({
                    type: 'TEST2',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToPast2',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
                TEST2: function (state, action) {
                    return __assign({}, state, { test: 'test3' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('jumpToPast index 1 should return "test2"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(1);
            expect(timeMachineNode.getState().test).toBe('test2');
        });
    });
    describe('jumpToFuture index 1', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
                test2: function () { return ({
                    type: 'TEST2',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToFuture1',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
                TEST2: function (state, action) {
                    return __assign({}, state, { test: 'test3' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('jumpToFuture index 1 should return "test3"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.jumpToPast(0);
            timeMachineNode.dispatchers.jumpToFuture(1);
            expect(timeMachineNode.getState().test).toBe('test3');
        });
    });
    describe('jumpToFuture index 2', function () {
        var timeMachineNode;
        var config = {
            actionCreators: {
                test: function () { return ({
                    type: 'TEST',
                }); },
                test2: function () { return ({
                    type: 'TEST2',
                }); },
                test3: function () { return ({
                    type: 'TEST3',
                }); },
            },
            initialState: {
                test: 'test',
            },
            name: 'jumpToFuture2',
            reducers: {
                TEST: function (state, action) {
                    return __assign({}, state, { test: 'test2' });
                },
                TEST2: function (state, action) {
                    return __assign({}, state, { test: 'test3' });
                },
                TEST3: function (state, action) {
                    return __assign({}, state, { test: 'test4' });
                },
            },
        };
        beforeEach(function () {
            timeMachineNode = index_1.createTimeMachineNode(config);
        });
        it('jumpToFuture index 2 should return "test4"', function () {
            timeMachineNode.dispatchers.test();
            timeMachineNode.dispatchers.test2();
            timeMachineNode.dispatchers.test3();
            timeMachineNode.dispatchers.jumpToPast(0);
            timeMachineNode.dispatchers.jumpToFuture(2);
            expect(timeMachineNode.getState().test).toBe('test4');
        });
    });
});
