Universal Counter Demo
======================

## redux-core + React + RxJS

In redux, to make an universal app you have to gather all your Promises returned from dispatch() in server side, this could be painful if you have many Promises.

With RxJS and [RxMiddleware](https://github.com/jas-chen/rx-redux/#best-practice-to-make-your-app-all-the-way-reactive), subscribe for stream complete event and you are done.

## To run this example

```
cd examples/universal-counter
npm install

# Production mode
npm run build-server
npm run build-client
npm run server
open http://localhost:3000


# Development mode, start 3 consoles to run each command
npm run build-server-watch
npm run build-client-watch
npm run dev
open http://localhost:3000
```

