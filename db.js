"use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

// added for MacOs
// -----------------------------
// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`
//   });
// }

// added for Ubuntu in WSL2
// -----------------------------
// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     host: "/var/run/postgresql/",
//     database: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     host: "/var/run/postgresql/",
//     database: getDatabaseUri()
//   });
// }

// added for deployment
// -----------------------------
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: `${getDatabaseUri()}`,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`
  });
}


db.connect();

module.exports = db;