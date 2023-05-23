import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../../constants/colors';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'mydatabase.db'},
  () => {},
  error => {
    console.log('DB Error', error);
  }
);

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = ({navigation}) => {
  // const navigation = useNavigation();
  React.useEffect(() => {
    createUserTable();
  }, []);
  const createUserTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (firstName TEXT, lastName TEXT, email TEXT, password TEXT, profileImage TEXT)',
        [],
        () => {
          console.log('User table created successfully');
        },
        error => {
          console.log('Error creating user table:', error);
        }
      );
    });
  };

  const handleSignup = (values: any) => {
    const {firstName, lastName, email, password} = values;
    const profileImage = '';
    db.transaction(tx => {
      // Execute the INSERT query
      tx.executeSql(
        'INSERT INTO users (firstName,lastName, email, password, profileImage) VALUES (?, ?, ?,?,?)',
        [firstName, lastName, email, password, profileImage],
        (tx, results) => {
          // Check if the insertion was successful
          if (results.rowsAffected > 0) {
            navigation.navigate('Login');
            console.log('User data inserted successfully.');
          } else {
            console.log('Failed to insert user data.');
          }
        },
        error => {
          console.log('Error occurred while inserting user data:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 130, marginBottom: 40}}>
        <Text
          style={{
            color: colors.primary,
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          Sify Story
        </Text>
        <Text
          style={{
            color: colors.primary,
            alignSelf: 'center',
            fontSize: 18,
            marginTop: 20,
          }}>
          Create New Account
        </Text>
      </View>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              placeholderTextColor="#BDBDBD"
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
              placeholderTextColor="#BDBDBD"
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              value={values.email}
              placeholderTextColor="#BDBDBD"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
              secureTextEntry
              placeholderTextColor="#BDBDBD"
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#65676b',
  },
  footerLink: {
    color: colors.primary,
    textDecorationLine: 'none',
    fontSize: 16,
  },
  text: {
    color: colors.primary,
    position: 'absolute',
    bottom: 20,
  },
});

export default Signup;
