const script = process.env.NODE_ENV === 'production' ?
  '<script src="/assets/js/bundle.js"></script>':
  '<script src="http://localhost:8080/webpack-dev-server.js"></script>\n'+
  '<script src="http://localhost:8080/bundle.js"></script>'

export default function (view, state) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>redux-core universal counter</title>
  <link rel="stylesheet" type="text/css" href="/assets/css/main.css">
</head>
<body>
<h1>Universal counter demo with redux-core</h1>
<div id="root">${view}</div>
<script>window.__state = ${JSON.stringify(state)} ;</script>
${script}
</body>
</html>`;
}