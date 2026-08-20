const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const dataPath = "/app/data";

if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath, { recursive: true });
}

app.get("/visits", (req, res) => {
    const filePath = path.join(dataPath, "visits.txt");

    let visits = 0;

    if (fs.existsSync(filePath)) {
        visits = parseInt(fs.readFileSync(filePath, "utf8")) || 0;
    }

    visits++;

    fs.writeFileSync(filePath, visits.toString());

    res.json({
        message: "Visit count stored using Docker Volume",
        visits: visits
    });
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
