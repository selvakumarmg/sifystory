import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Create or open the database
const db: SQLiteDatabase = SQLite.openDatabase({
  name: 'sify.db',
  location: 'default',
});

// Create the Signup table if it doesn't exist
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Signup (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, password TEXT)',
    [],
    () => console.log('Signup table created successfully.'),
    error => console.error('Error creating Signup table: ', error)
  );
});

// Insert signup data into the Signup table
export const insertSignupData = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  callback: (success: boolean) => void
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Signup (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, password],
      (_, result) => {
        if (result.rowsAffected > 0) {
          callback(true); // Successful insertion
        } else {
          callback(false); // Failed insertion
        }
      },
      error => console.error('Error inserting signup data: ', error)
    );
  });
};
