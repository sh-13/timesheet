import * as SQLite from 'expo-sqlite';

let db;

// Setup the database and create the table if it doesn't exist
export const setupDatabase = async () => {
  // Open the database asynchronously
  db = await SQLite.openDatabaseAsync('carmech.db');

  // Execute bulk SQL queries to set up the table if it doesn't exist
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS timesheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_name TEXT,
      clock_in TEXT,
      clock_out TEXT
    );
  `);
};

// Insert clock-in time for an employee
export const insertClockIn = async (name) => {
  const now = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO timesheets (employee_name, clock_in) VALUES (?, ?);',
    name, now
  );
};

// Update clock-out time for an employee
export const updateClockOut = async (name) => {
    const now = new Date().toISOString();
  
    // Step 1: Get the latest clock-in entry with no clock-out
    const row = await db.getFirstAsync(
      `SELECT id FROM timesheets
       WHERE employee_name = ? AND clock_out IS NULL
       ORDER BY id DESC LIMIT 1;`,
      [name]
    );
  
    if (row && row.id) {
      // Step 2: Update that entry by ID
      await db.runAsync(
        `UPDATE timesheets SET clock_out = ? WHERE id = ?;`,
        [now, row.id]
      );
    } else {
      console.log('No open clock-in found for', name);
    }
};

// Get timesheets for a specific employee or all employees
export const getTimesheets = async (name) => {
  const query = name === 'ALL'
    ? `SELECT * FROM timesheets ORDER BY clock_in DESC;`
    : `SELECT * FROM timesheets WHERE employee_name = ? ORDER BY clock_in DESC;`;

  const result = name === 'ALL'
    ? await db.getAllAsync(query)
    : await db.getAllAsync(query, [name]);

  return result;
};

// Delete all timesheets data
export const deleteAllTimesheets = async () => {
  await db.runAsync('DELETE FROM timesheets;');
};

// Delete records older than 3 months
export const deleteOldRecords = async () => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const isoDate = threeMonthsAgo.toISOString();

  await db.runAsync('DELETE FROM timesheets WHERE clock_in < ?;', isoDate);
};