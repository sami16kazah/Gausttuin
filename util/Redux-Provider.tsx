"use client"
import React, { FC , ReactNode } from 'react'
import { Provider } from 'react-redux';
import { store } from '../store/store';
interface ReduxProviderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
  }
export const ReduxProvider:FC<ReduxProviderProps> = ({children}) => {
  return (
    <Provider store={store}>
    {children}
    </Provider>
  )
}
