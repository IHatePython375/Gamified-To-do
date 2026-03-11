const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "gamified-todo.db");

// sql.js wrapper that mimics the better-sqlite3 API
// so all other files (routes, middleware) work without changes
class DatabaseWrapper {
  constructor() {
    this.db = null;
    this.ready = false;
  }

  async init() {
    const SQL = await initSqlJs();

    // Load existing db file or create new one
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      this.db = new SQL.Database(buffer);
    } else {
      this.db = new SQL.Database();
    }

    this.ready = true;
    this._createTables();
    return this;
  }

  _save() {
    const data = this.db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  }

  _createTables() {
    this.db.run("PRAGMA foreign_keys = ON");

    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        condition TEXT NOT NULL CHECK(condition IN ('gamified', 'control')),
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'personal' CHECK(category IN ('homework', 'chores', 'work', 'personal')),
        priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
        is_completed BOOLEAN DEFAULT 0,
        scheduled_date DATE NOT NULL,
        completed_at DATETIME,
        xp_earned INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        task_id INTEGER,
        xp_gained INTEGER DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (task_id) REFERENCES tasks(id)
      )
    `);

    this._save();
  }

  // Mimics better-sqlite3's prepare() API
  prepare(sql) {
    const db = this.db;
    const save = () => this._save();

    return {
      // Get one row as an object (or undefined if none)
      get(...params) {
        const stmt = db.prepare(sql);
        if (params.length > 0) stmt.bind(params);

        let result = undefined;
        if (stmt.step()) {
          result = stmt.getAsObject();
        }
        stmt.free();
        return result;
      },

      // Get all rows as array of objects
      all(...params) {
        const results = [];
        const stmt = db.prepare(sql);
        if (params.length > 0) stmt.bind(params);

        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
      },

      // Execute a write query, return { lastInsertRowid, changes }
      run(...params) {
        db.run(sql, params);
        const lastId = db.exec("SELECT last_insert_rowid() as id")[0]?.values[0][0] || 0;
        const changes = db.getRowsModified();
        save();
        return { lastInsertRowid: lastId, changes };
      },
    };
  }

  exec(sql) {
    this.db.run(sql);
    this._save();
  }

  pragma(str) {
    this.db.run(`PRAGMA ${str}`);
  }
}

// Create and initialize the database
const wrapper = new DatabaseWrapper();

// We need to handle the async init
// Export a promise that resolves to the wrapper
const dbReady = wrapper.init();

// Also export the wrapper directly for sync access after init
module.exports = wrapper;
module.exports.dbReady = dbReady;