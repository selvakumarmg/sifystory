import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const db = SQLite.openDatabase(
  {name: 'mydatabase.db'},
  () => {},
  error => {
    console.log('DB Error', error);
  }
);

export const saveNews = (news: {
  id: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}) => {
  const {id, title, description, urlToImage, publishedAt, content} = news;
  console.log('publishedAt', content);
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS News (id TEXT PRIMARY KEY, title TEXT, description TEXT, urlToImage TEXT, publishedAt DATE, content TEXT)',
      [],
      () => {
        tx.executeSql(
          'INSERT OR IGNORE INTO News (id, title, description, urlToImage, publishedAt, content) VALUES (?, ?, ?, ?, ?, ?)',
          [id, title, description, urlToImage, publishedAt, content],
          (_, {rowsAffected}) => {
            if (rowsAffected > 0) {
              console.log('News saved successfully');
            } else {
              console.log('News already exists');
            }
          },
          (_, error) => {
            console.log('Error occurred while saving news:', error);
          }
        );
      },
      (_, error) => {
        console.log('Error occurred while creating the table:', error);
      }
    );
  });
};

export const deleteAllSavedNews = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM News',
      [],
      (_, {rowsAffected}) => {
        console.log('Deleted all saved news');
      },
      (_, error) => {
        console.log('Error occurred while deleting saved news:', error);
      }
    );
  });
};

export const deleteNews = (id: {id: string}) => {
  console.warn('ID news', id);
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM News WHERE id = ?',
      [id],
      (_, {rowsAffected}) => {
        if (rowsAffected > 0) {
          console.log('News deleted successfully');
        } else {
          console.log('No news found with the specified id');
        }
      },
      (_, error) => {
        console.log('Error occurred while deleting news:', error);
      }
    );
  });
};

export const getSaveItems = (): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    const data: Item[] = [];
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, title, description, urlToImage, publishedAt, content FROM News',
        [],
        (_, {rows}) => {
          for (let i = 0; i < rows.length; i++) {
            const {id, title, description, urlToImage, publishedAt, content} =
              rows.item(i);
            data.push({
              id,
              title,
              description,
              urlToImage,
              publishedAt,
              content,
            });
          }
          resolve(data); // Resolve the promise with the retrieved items
        },
        error => {
          console.error('Error retrieving items:', error);
          reject(error); // Reject the promise with the error
        }
      );
    });
  });
};

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
};

export const updateProfile = (data: ProfileData): Promise<string> => {
  const {firstName, lastName, email, profileImage} = data;

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET firstName = ?, lastName = ?, profileImage = ? WHERE email = ?',
        [firstName, lastName, profileImage, email],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            resolve('User data updated successfully!');
          } else {
            resolve('No rows were updated.');
          }
        },
        (txObj, error) => {
          reject('Error occurred while updating user data: ' + error);
        }
      );
    });
  });
};

export const fetchUserDetails = email => {
  console.log('email', email);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT firstName, lastName, profileImage, email FROM users WHERE email = ?',
        [email],
        (txObj, resultSet) => {
          if (resultSet.rows.length > 0) {
            const user = resultSet.rows.item(0);
            resolve(user);
          } else {
            resolve(null);
          }
        },
        (txObj, error) => {
          console.error('Error fetching user details:', error);
          reject(error);
        }
      );
    });
  });
};
