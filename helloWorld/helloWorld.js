import { LightningElement } from 'lwc'
import {
    dispatch, subscribe, getState,
    actions,
    createSlice,
    createSelector,
    registerSelector, subscribeToSelector, waitFor
} from 'c/redux';

createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: state => state + 1
    }
})

// selector example
const count = registerSelector('count', state => state.counter)

// example of nested selector
registerSelector('doubleCount', count, value => value * 2)

export default class HelloWorld extends LightningElement {

    count;
    count2;
    
    connectedCallback() {
        this.sub = subscribeToSelector('count', count => {
            this.count = count
        })
        this.sub2 = subscribeToSelector('doubleCount', count => {
            this.count2 = count
        })
        this.init()
    }

    disconnectedCallback() {
        if (this.sub) this.sub()
        if (this.sub2) this.sub2()
    }

    async init() {
        await waitFor('count', 3)
        // ... do something when count is 3
    }

    handleIncrement() {
        this.thunkIncrement()
    }

    // example of async (thunk) action
    async thunkIncrement() {
        let state1, state2;
        await dispatch(async (dispatch, getState) => {
            state1 = getState()
            dispatch(actions.increment())
            state2 = getState()
            await new Promise(r => { setTimeout(r, 2000) })
        })
        console.log('waited 2 seconds...', state1, state2)
    }
}