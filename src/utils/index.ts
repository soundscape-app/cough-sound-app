export { toJS } from 'mobx';

export { default as Navigation } from './RootNavigation';
export { default as Request } from './Request';
export { default as Storage } from './Storage';
export { default as Format } from './Format';

export const delay = (time: any) => new Promise(resolve => setTimeout(resolve, time));

export function debug(...args: any[]) {
    for (const obj of args) {
        console.log(toJS(obj));
    }
}