// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const express = require("express");
require("dotenv").config({ // eslint-disable-line @typescript-eslint/no-var-requires
	path: "./.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Example app listening on port ${PORT}!`);
});
