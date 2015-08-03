import * as CounterIntents from './intents/CounterIntents';

const list = [
  CounterIntents.increment,
  CounterIntents.decrement,
  CounterIntents.incrementIfOdd,
  CounterIntents.incrementTimeout,
  CounterIntents.incrementPromise
];

export default list;
