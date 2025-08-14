import { configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

export const store = configureStore({
  reducer: {
    form: formReducer
  }
});
