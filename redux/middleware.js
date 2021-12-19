export const logger = store => next => action => {
    console.log('%cPrevious State:', 'color: #00AEEF; font-weight: bold;', store.getState());
    console.log('Redux Action: %c' + action.type, 'color: #005A9D; font-weight: bold;', action);
    let result = next(action);
    console.log('%cNext State:', 'color: #0071C5; font-weight: bold;', store.getState());
    return result;
}

export const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error('Redux: Caught an exception!')
        console.log('Redux Error: ', err, action, store.getState());
        throw err;
    }
}