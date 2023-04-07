const express = require("express");
require("dotenv").config({
	path: "./.env",
});
const history = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));
app.use(history('index.html', { root: './dist' }));

app.use((req, res, next) => {
	res.setHeader(
		"Content-Security-Policy",
		`default-src 'self'; 
		 font-src 'self';
		 img-src 'self';
		 script-src 'self';
		 style-src 'self';
		 frame-src 'self'`,
	);
	next();
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Example app listening on port ${PORT}!`);
});
