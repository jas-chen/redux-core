import React, { Component, PropTypes } from 'react';
import * as CounterIntents from '../../intents/CounterIntents';

class Counter extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.state.counter !== this.props.state.counter;
  }

  render() {
    const { state, intent$ } = this.props;
    return (
      <p>
        <button onClick={ () => intent$.onNext(CounterIntents.decrement()) }>-</button>
        <span>{state.counter}</span>
        <button onClick={ () => intent$.onNext(CounterIntents.increment()) }>+</button>
        <button onClick={ () => intent$.onNext(CounterIntents.incrementIfOdd()) }>Increment if odd</button>
        <button onClick={ () => intent$.onNext(CounterIntents.incrementTimeout()) }>Increment after 1 sec.</button>
        <button onClick={ () => intent$.onNext(CounterIntents.incrementPromise()) }>Increment from promise.</button>
      </p>
    );
  }
}

Counter.propTypes = {
  state: PropTypes.object.isRequired,
  intent$: PropTypes.object.isRequired
};

export default Counter;