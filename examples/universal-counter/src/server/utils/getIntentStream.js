import Rx from 'rx';
import list from '../../shared/intents/CounterIntentList';

// Transform intent ids to intent function
export default function getIntentStream(intentIds) {
  const intents = [];

  if (intentIds) {
    intentIds.split('').forEach(id => {
      const intentCreator = list[id];

      // in case user modify query string to invalid id like '11asdasdas'
      if (intentCreator) {
        const intent = intentCreator();
        intents.push(intent);
      }
    });
  }

  return Rx.Observable.from(intents);
}