const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'ecosystem-db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class EmbeddedStore {
  constructor() {
    this.data = {
      admins: [],
      brands: [],
      siteSettings: null,
      media: [],
      activityLogs: [],
    };
    this.load();
  }

  load() {
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (e) {
        console.warn('Failed to parse local database file, initializing clean store.');
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save to local database file:', e.message);
    }
  }

  generateId() {
    return (
      Math.random().toString(16).substring(2, 10) +
      Math.random().toString(16).substring(2, 10) +
      Math.random().toString(16).substring(2, 10)
    );
  }
}

const store = new EmbeddedStore();

module.exports = { store };
