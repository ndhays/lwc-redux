import { configureStore, getDefaultMiddleware, createSlice } from './redux-toolkit'
import { createSelector } from './reselect'
import { logger, crashReporter } from './middleware'
import { createReducerManager } from './reducerManager'
import { createSelectorManager } from './selectorManager'

// Exported Functions Usage:
//
// Redux: https://redux.js.org/api/store
// dispatch, subscribe, getState
// 
// Redux Toolkit: https://redux-toolkit.js.org/api/createSlice#parameters
// createSlice
// 
// Reselect: https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc
// createSelector(...inputSelectors | [inputSelectors], resultFunc)
//
//
// Custom Helpers:
//
// actions - { list of actions }
//
// registerSelector(name, ...inputSelectors | [inputSelectors], resultFunc)
//   - name (string)
//   NOTE: See Reselect's createSelector for more details
//   resultFunc is optional (default: result => result)
//
// subscribeToSelector(name, callback)
//   - name (string)
//   - callback (function)
//
// waitFor(selectorNameOrFunction, valueOrTestFunction)
//   - selectorNameOrFunction (string|function)
//   - valueOrTestFunction (any|function)
//

const staticReducers = {}

const reducerManager = createReducerManager(staticReducers)

const configureAppStore = (preloadedState) => {
    const store = configureStore({
        reducer: reducerManager.reduce,
        middleware: [...getDefaultMiddleware(), logger, crashReporter],
        preloadedState
        // enhancers: [monitorReducersEnhancer]
    })

    return store
}

const myStore = configureAppStore()

myStore.reducerManager = reducerManager

myStore.actions = {}
myStore.actionsManager = {
    add: (actions) => {
        myStore.actions = { ...myStore.actions, ...actions }
    }
}

myStore.createSlice = (sliceOptions) => {
    let { actions, reducer } = createSlice(sliceOptions)
    myStore.reducerManager.add(sliceOptions.name, reducer)
    myStore.actionsManager.add(actions)
    myStore.dispatch({ type: '@@REINIT_NEW_SLICE' })
}

myStore.selectorManager = createSelectorManager()
myStore.createSelector = createSelector
myStore.registerSelector = myStore.selectorManager.register


// Observables and Custom Helpers

myStore.observeSelector = (selector, onChange) => {
    let currentState
    function handleChange() {
        let nextState = selector(myStore.getState())
        if (nextState !== currentState) {
            currentState = nextState
            onChange(currentState)
        }
    }
    let unsubscribe = myStore.subscribe(handleChange)
    handleChange()
    return unsubscribe
}

myStore.subscribeToSelector = (selector, callback) => {
    let selFn = typeof selector === 'string' ? myStore.selectorManager.get(selector) : selector;
    if (typeof selFn !== 'function') {
        throw new Error('First argument of subscribeToSelector must be a registered selector or a valid selector function')
    }
    return myStore.observeSelector(selFn, callback)
}

myStore.waitFor = (selector, valueOrTest = true) => {
    let eqFn = typeof valueOrTest === 'function' ? valueOrTest : v => v === valueOrTest
    return new Promise(resolve => {
        let unsubscribe = myStore.subscribeToSelector(selector, val => {
            if (eqFn(val)) {
                resolve(true)
                unsubscribe()
            }
        })
    })
}

export default myStore
