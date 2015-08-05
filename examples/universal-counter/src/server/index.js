import express from 'express';
import path from 'path';
import { createStore } from 'redux-core';
import { reducer, applyRxMiddleware } from '../shared';
import getIntentStream from './utils/getIntentStream';
import render from './utils/render';
import Counter from '../shared/view/components/Counter';
import React from 'react';

var app = express();

// main
app.get('/', function (req, res) {
  const intentIds = req.query.intentId;

  console.log('\n\nReceive request with intent ids: ' + intentIds);

  const store = createStore(reducer);
  const intent$ = getIntentStream(intentIds);
  const action$ = applyRxMiddleware(intent$, store);
  const state$ = action$.map(store.dispatch).startWith(store.getState());

  let finalState = store.getState();

  state$.subscribe(
    (state) => {
      console.log(state);
      finalState = state;
    },
    (err) => { throw new Error(err); },
    () => {
      console.log('state$ completed.');
      const intent$ = {};
      const view = React.renderToString(<Counter state={finalState} intent$={intent$}/>);
      res.send(render(view, finalState));
    }
  );


});

// static path for browser to get bundle.js
app.use('/assets', express.static(path.join('.', 'build', 'assets')));

app.get('*', function (req, res) {
  res.status(404).end('404 - Page Not Found');
});

app.listen(3000, function () {
  console.log('Listening on port 3000, root: ' + path.dirname(require.main.filename));
});