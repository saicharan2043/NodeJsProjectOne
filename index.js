const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const newPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: newPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => console.log("server is running"));
  } catch (e) {
    console.log(`some error is display ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books", async (request, Response) => {
  const booksQuery = `
        select * from book order by book_id ;
    `;
  const booksArray = await db.all(booksQuery);
  Response.send(booksArray);
});
