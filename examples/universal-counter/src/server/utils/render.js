// import fs from 'fs';

// const index = fs.readFileSync('./src/server/index.html', {encoding: 'utf-8'});

export default function (view, state) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>redux-core</title>
  <style>
    button {
      margin: 0 4px;
    }
  </style>
</head>
<body>
<h1>Universal counter demo with redux-core</h1>
<div id="root">${view}</div>
<script>window.__state = ${JSON.stringify(state)} ;</script>
<script src="/assets/js/bundle.js"></script>
</body>
</html>`;
  return html;
}