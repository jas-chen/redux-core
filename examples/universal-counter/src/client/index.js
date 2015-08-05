import React from 'react';
import Rx from 'rx';
import { createStore } from 'redux-core';
import { reducer, applyRxMiddleware } from '../shared';
import Counter from '../shared/view/components/Counter';

const root = document.getElementById('root');

const store = window.__state ? createStore(reducer, window.__state): createStore(reducer);

const intent$ = new Rx.Subject();
const action$ = applyRxMiddleware(intent$, store);
const state$ = action$.map(store.dispatch).startWith(store.getState());

state$.subscribe(
  (state) => { React.render(<Counter state={state} intent$={intent$}/>, root); },
  (err) => { throw new Error(err); },
  () => console.log('state$ completed.')
);
