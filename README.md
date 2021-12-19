# lwc-redux
Redux implementation for Salesforce LWC  
See functional documentation below  
View **helloWorld** component for examples

## Exported Functions
### [Redux](https:redux.js.org/api/store)
- #dispatch
- #subscribe
- #getState
 
### [Redux Toolkit](https:redux-toolkit.js.org/api/createSlice#parameters)
- #createSlice

### [Reselect](https:github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc)
- createSelector(...inputSelectors | [inputSelectors], resultFunc)


### Custom Helpers
- #actions

- #registerSelector(name, ...inputSelectors | [inputSelectors], resultFunc)  
*name (string), NOTE: See Reselect's createSelector for more details, resultFunc is optional (default: result => result)*

- #subscribeToSelector(name, callback)
*name (string), callback (function)*

- #waitFor(selectorNameOrFunction, valueOrTestFunction)
*selectorNameOrFunction (string|function), valueOrTestFunction (any|function)*