import { createStore, combineReducers } from 'redux';
import { CollApsedReducer } from './reducers/collapsedreducer'
import { LoadingReducer } from './reducers/loadingreducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['LoadingReducer']
  }

const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const persistor = persistStore(store)

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk,reduxPromis)))

export {
    store,
    persistor
}