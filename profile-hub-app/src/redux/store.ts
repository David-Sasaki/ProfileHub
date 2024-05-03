import { createStore } from 'redux';
import profilesReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    profilesReducer,
    composeWithDevTools()
);

export default store;
export type AppState = ReturnType<typeof store.getState>;
