# lwc-redux
Redux implementation for Salesforce LWC  
See functional documentation below  
View **helloWorld** component for examples

## Exported Functions
### [Redux](https:redux.js.org/api/store)
#### **dispatch** ([View Documentation](https://redux.js.org/api/store#dispatchaction))
#### **subscribe** ([View Documentation](https://redux.js.org/api/store#subscribelistener))
#### **getState** ([View Documentation](https://redux.js.org/api/store#getState))
  
### [Redux Toolkit](https://redux-toolkit.js.org/)
#### **createSlice** ([View Documentation](https:redux-toolkit.js.org/api/createSlice#parameters))
  
### [Reselect](https:github.com/reduxjs/reselect)
#### **createSelector(...inputSelectors | [inputSelectors], resultFunc)** ([View Documentation](https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc))

---

## Custom Helpers
#### **registerSelector(name, ...inputSelectors | [inputSelectors], resultFunc)**  
*name (string)*   
resultFunc is optional (default: result => result)  
##### *NOTE: See Reselect's [createSelector](https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc) for more details*
##### Example
```javascript
const colorSelector = registerSelector('color', state => state.color)
```
  
#### **subscribeToSelector(name, callback)**  
*name (string)*  
*callback (function)*
##### Example
```javascript
subscribeToSelector('color', (newColor) => {
  ...doSomethingWithNewColorState
})
```
  
#### **waitFor(selectorNameOrFunction, valueOrTestFunction)**
*selectorNameOrFunction (string|function)*  
*valueOrTestFunction (any|function)*  
returns Promise
##### Example
```javascript
const waitForPrimaryColor = waitFor('color', (newColor) => ['red', 'yellow', 'blue'].includes(newColor))
```
  
#### **actions** - returns list of registered actions

### License
MIT