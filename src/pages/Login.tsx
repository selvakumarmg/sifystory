import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {HelperText} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../constants/colors';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'mydatabase.db'});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // Define validation schema using yup
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const getUserDataByEmail = (email, callback) => {
    db.transaction(tx => {
      // Execute the SELECT query
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (tx, results) => {
          const rows = results.rows;
          const userData = [];

          // Iterate over the rows and extract the data
          for (let i = 0; i < rows.length; i++) {
            userData.push(rows.item(i));
          }

          // Pass the retrieved data to the callback function
          callback(userData);
        },
        error => {
          console.log('Error occurred while retrieving user data:', error);
        }
      );
    });
  };

  // Usage example
  // Formik hook
  const {handleChange, handleSubmit, values, errors, touched, setErrors} =
    useFormik({
      initialValues: {email: 'selva@gmail.com', password: '123456'},
      validationSchema,
      onSubmit: values => {
        getUserDataByEmail(values.email, userData => {
          console.log('Retrieved user data:', userData);
          if (
            values?.email === userData[0]?.email &&
            values?.password === userData[0]?.password
          ) {
            const user = {
              name: userData[0]?.firstName,
              email: userData[0]?.email,
            };
            dispatch({type: 'LOGIN', payload: {user}});
          } else {
            setErrors({
              password: 'Invalid existing user, create new user',
            });

            setTimeout(() => {
              setErrors({
                password: '',
              });
            }, 5000);
          }
        });
      },
    });

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <View style={styles.logo}>
          <Text
            style={{fontSize: 24, fontWeight: 'bold', color: colors.primary}}>
            Sify Story
          </Text>
          <Text style={{fontSize: 12, color: colors.primary}}>
            Your Window to the World's Stories
          </Text>
        </View>
        <View style={styles.formGroup}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.primary}
            onChangeText={handleChange('email')}
            value={values.email}
            placeholderTextColor="#BDBDBD"
            // onBlur={handleChange('email')}
            style={styles.inputField}
          />
          {touched.email && errors.email && (
            <HelperText type="error">{errors.email}</HelperText>
          )}
        </View>
        <View style={styles.formGroup}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.primary}
            onChangeText={handleChange('password')}
            value={values.password}
            style={styles.inputField}
            secureTextEntry
            placeholderTextColor="#BDBDBD"
            // onBlur={handleChange('password')}
          />
          {touched.password && errors.password && (
            <HelperText type="error">{errors.password}</HelperText>
          )}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerLink}>Sign up</Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        &copy; {new Date().getFullYear()} Sify. All rights reserved.
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loginCard: {
    backgroundColor: '#fff',
    width: 350,
  },
  logo: {
    marginTop: 130,
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 120,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputField: {
    width: '100%',
    padding: 12,
    color: colors.primary,
    borderColor: '#dddfe2',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#65676b',
  },
  footerLink: {
    color: colors.primary,
    textDecorationLine: 'none',
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
  },
});
