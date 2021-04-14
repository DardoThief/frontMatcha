import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import { authReducer } from './flow/auth/reducers';
// import { banknotesReducer } from './flow/banknotes/reducer';
// import { counterfeitsReducer } from './flow/counterfeits/reducer';
// import { countryReducer } from './flow/countries/reducer';
// import { currencyReducer } from './flow/currencies/reducer';
// import { imitationProtectionsReducer } from './flow/imitationProtections/reducers';
// import { loadingDataReducer } from './flow/loadingData/reducer';
// import { machineProtectionReducer } from './flow/machineProtection/reducer';
// import { newsReducer } from './flow/news/reducer';
// import { protectionsReducer } from './flow/protections/reducer';
// import { serialReducer } from './flow/serial/reducer';
// import { serialsReducer } from './flow/serials/reducer';
// import { IRootState } from './types';
import { authReducer } from './flow/auth/reducer';

// @ts-ignore
const rootReducers = combineReducers({
  auth: authReducer,
});

export const enhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducers, enhancer);
