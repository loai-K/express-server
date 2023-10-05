"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = require("lowdb");
const node_1 = require("lowdb/node");
const defaultData = { messages: [] };
const adapter = new node_1.JSONFile('db.json');
const db = new lowdb_1.Low(adapter, defaultData);
//# sourceMappingURL=jsonData.js.map