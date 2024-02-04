import Database from "better-sqlite3";
//hook up our database for methods
const db = new Database("database.db");
//  create database
db.exec(`CREATE TABLE IF NOT EXISTS guestbook(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    date TEXT,
    comment TEXT)`);

//seed data into db
db.exec(`INSERT into guestbook(name , date , comment)
    VALUES
    ('Robbie' , '25-01-2024' , 'Wow what a great place and an event better database')`);
