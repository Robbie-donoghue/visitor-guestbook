import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

//  variables
const app = express();
const PORT = `7777`;
const db = new Database("database.db");
//middleware
app.use(express.json());
app.use(cors());
//listen request
app.listen(`${PORT}`, () => {
  console.log(`port started on PORT:${PORT}`);
});

//get request, root route
app.get("/", (req, res) => {
  res.send(`root ROUTE ⊂(◉‿◉)つ`);
});
//get request at database
app.get("/guestbook", (req, res) => {
  //try catch
  try {
    //find guest by id
    if (req.query.id) {
      let guestBook = db
        .prepare(`SELECT * FROM guestbook WHERE id = ?`)
        .all(`req.query.id`);
      res.status(200).json(guestBook);
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  if (req.query.one) {
    res.send("Query one");
  }
});
//post route to add visitors to guest-book
app.post("/guestbook", (req, res) => {
  //try catch
  try {
    //set varibles
    const name = req.body.name;
    const date = req.body.date;
    const comment = req.body.comment;
    const newEntry = db
      .prepare(`INSERT INTO guestbook (name , date , comment) VALUES(?,?, ?)`)
      .run(name, date, comment);
    res.status(200).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// delete
app.delete("/guestbook/:id", (req, res) => {
  try {
    const id = req.params.id;
    const deletedEntry = db
      .prepare(`DELETE FROM guestbook WHERE id = ? `)
      .run(id);
    //http response codes
    res.status(200).json({ recordDeleted: deletedEntry });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
