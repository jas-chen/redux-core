import Rx from 'rx';
import list from '../../shared/IntentCreatorList';

// Transform action ids to action
export default function getActionStream(query) {
  const actions = [];

  if(query.action) {
    query.action.split('').forEach(id => {
      const actionCreator = list[id];

      // in case user modify query string to invalid id like '11asdasdas'
      if( typeof actionCreator === 'function') {
        actions.push(actionCreator());
      }
    });
  }

  return Rx.Observable.from(actions);
}