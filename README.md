# ReduxTimeMachine

> Redux Time Machine.
> Convert your redux in a time machine. Basic to implement do-undo system in your application.

[![Build Status](https://travis-ci.org/tcorral/redux-time-machine.svg?branch=master)](https://travis-ci.org/tcorral/redux-time-machine)
[![NPM Version](https://badge.fury.io/js/redux-time-machine.svg)](http://badge.fury.io/js/redux-time-machine)
[![Chat on Gitter](https://badges.gitter.im/tcorral/redux-time-machine.svg)](https://gitter.im/tcorral/redux-time-machine?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation

ReduxTimeMachine is available as an NPM package. You can install ReduxTimeMachine
in your project's directory as usual:

```bash
$ npm install redux-time-machine --save
```

## Usage

### ReduxTimeMachine
-------
### StateHubTimeMachine class api
ReduxTimeMachine provides you with a class to instanciate your time machine hub node.
> StateHubTimeMachine is a [Generic class](https://www.typescriptlang.org/docs/handbook/generics.html) and can be configured in advance so [TypeScript](https://www.typescriptlang.org) can provide the right information.

#### Generics
On creating an instance of StateHub you need to provide the following Generics:

1. State - Provide your state interface.
2. Dispatchers - Provide your dispatchers interface.
3. HubModel - Provide the Hub model interface.
4. Result - Empty object where the node builder will store the used methods.

```typescript
import { StateHubTimeMachine } from 'redux-time-machine';

const stateHubTimeMachine = new StateHubTimeMachine<State, Dispatchers, Hub, {}>();
```

For more information [see StateHub Node API](https://github.com/tcorral/redux-hub#statehub-instance-api)


### How ReduxTimeMachine works.
ReduxTimeMachine abstracts the way to store the past, present and future values.

#### Present value
The present value is the current state value.

#### Past values
The past value is an array where ReduxTimeMachine pushes every old state when present state value has changed.

#### Future values
The future value is an array where ReduxTimeMachine pushes every state if the user navigated back to a past value.

##### Initial Value
```javascript
{
    test: 'test'
}
```
##### On creating the ReduxTimeMachine node
```javascript
{
    test: {
        past: [],
        present: 'test',
        future: []
    }
}
```

### ReduxHub Node API
[See ReduxHub Node API](https://github.com/tcorral/redux-hub#statehub-instance-api)

#### dispatchers
In addition to the dispatchers created as a ReduxHub Node, ReduxTimeMachine has other predefined actions to navigate backwards and forwards over the state.


##### undo
When this dispatcher is executed:
- The current state value is moved to the future.
- The last state value in past is moved to the present value.

State before dispatching **undo**

```javascript
{
    test: {
        past: ['test', 'test1', 'test2'],
        present: 'test3',
        future: []
    }
}
```

Dispatching **undo**

```javascript
node.dispatchers.undo();
```

State after dispatching **undo**

```javascript
{
    test: {
        past: ['test', 'test1'],
        present: 'test2',
        future: ['test3']
    }
}
```

##### redo
When this dispatcher is executed:
- The current state value is moved to the future.
- The last state value in past is moved to the present value.

State before dispatching **redo**

```javascript
{
    test: {
        past: ['test', 'test1'],
        present: 'test2',
        future: ['test3']
    }
}
```

Dispatching **redo**

```javascript
node.dispatchers.redo();
```

State after dispatching **redo**

```javascript
{
    test: {
        past: ['test', 'test1', 'test2'],
        present: 'test3',
        future: []
    }
}
```

##### jumpToPast
This dispatcher receives a number that is the index in the past array you want to move back to.

When this dispatcher is executed:
- The value stored in the past array position index passed to the dispatcher will be stored into the present value.
- The previous values to the position index will remain in past array.
- The values after position index will be added at the beginning of the future array.


State before dispatching **jumpToPast**

```javascript
{
    test: {
        past: ['test', 'test1'],
        present: 'test2',
        future: ['test3']
    }
}
```

Dispatching **jumpToPast**

```javascript
node.dispatchers.jumpToPast(0);
```

State after dispatching **jumpToPast**

```javascript
{
    test: {
        past: [],
        present: 'test',
        future: ['test1', 'test2', 'test3']
    }
}
```

##### jumpToFuture
This dispatcher receives a number that is the index in the past array you want to move back to.

When this dispatcher is executed:
- The value stored in the future array position index passed to the dispatcher will be stored into the present value.
- The previous values to the position index will be added to the past array.
- The values after position index will remain in the future array.

State before dispatching **jumpToFuture**

```javascript
{
    test: {
        past: ['test', 'test1'],
        present: 'test2',
        future: ['test3', 'test4']
    }
}
```

Dispatching **jumpToFuture**

```javascript
node.dispatchers.jumpToFuture(1);
```


State after dispatching **jumpToFuture**

```javascript
{
    test: {
        past: ['test', 'test1', 'test2', 'test3'],
        present: 'test4',
        future: []
    }
}
```

#### getState
This method returns present node state.

```javascript
node.getState();
```

## API documentation
API Documentation can be generated executing ```npm run docs```.
The documentation generated can be found inside the **docs** folder.

## Build the source
This library has been written using [TypeScript](http://typescriptlang.org).
If you need to use it in your project but you are not working with TypeScript you can always to build the code using ```npm run build``` This command will *lint your code*, *run the tests* and *compile* to TypeScript.

## Contributing

This project is maintained by a community of developers. Contributions are welcome and appreciated.
You can find ReduxTimeMachine on GitHub; feel free to start an issue or create a pull requests:<br>
[https://github.com/tcorral/redux-time-machine](https://github.com/tcorral/redux-time-machine)

For more information, read the [contribution guide](https://github.com/tcorral/redux-time-machine/blob/master/CONTRIBUTING.md).

## License

Copyright (c) 2019 [Tomas Corral](http://github.com/tcorral).<br>
Copyright (c) 2019 [ReduxTimeMachine Contributors](https://github.com/tcorral/redux-time-machine/graphs/contributors).<br>
Licensed under the MIT License.