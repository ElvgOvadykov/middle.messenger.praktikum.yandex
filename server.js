// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
	path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

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
