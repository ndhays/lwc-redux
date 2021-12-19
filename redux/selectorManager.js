import { createSelector } from './reselect'

export function createSelectorManager() {
    const selectors = {}

    return {

        register: (name, ...selectorArgs) => {
            if (selectorArgs.length < 2) selectorArgs.push(result => result)
            selectors[name] = createSelector(...selectorArgs);
            return selectors[name]
        },

        remove: name => {
            delete selectors[name]
        },

        get: name => selectors[name]
        
    }
}