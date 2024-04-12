const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
	if (req.method === "GET" && req.path === "/") {
		const userInfo = {
			ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
			userAgent: req.headers["user-agent"],
			time: new Date().toISOString(),
			referer: req.headers["referer"] || "Direct/Bookmark",
			language: req.headers["accept-language"],
		};

		fs.appendFile("user_info.log", JSON.stringify(userInfo) + "\n", (err) => {
			if (err) console.error("Failed to save user info:", err);
			else console.log("I'M GONNA GET YOU!");
		});
	}
	next();
});

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post("/log-visit", (req, res) => {
	fs.appendFile("visit_info.log", JSON.stringify(req.body) + "\n", (err) => {
		if (err) {
			res.status(500).send({ message: "Failed to log info" });
		} else {
			res.send({ message: "Info logged successfully" });
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
