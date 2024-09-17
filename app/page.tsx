"use client";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import SignIn from './auth/signin/page';
export default function Home() {
  return (
    <Provider store={store}>
    <SignIn />
  </Provider>
  );
}
