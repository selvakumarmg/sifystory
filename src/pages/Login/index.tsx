import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {HelperText} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import colors from '../../constants/colors';
import SQLite from 'react-native-sqlite-storage';
import styles from './styles';

const db = SQLite.openDatabase({name: 'mydatabase.db'});

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const getUserDataByEmail = (email, callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (tx, results) => {
          const rows = results.rows;
          const userData = [];
          for (let i = 0; i < rows.length; i++) {
            userData.push(rows.item(i));
          }
          callback(userData);
        },
        error => {
          console.log('Error occurred while retrieving user data:', error);
        }
      );
    });
  };

  const {handleChange, handleSubmit, values, errors, touched, setErrors} =
    useFormik({
      initialValues: {email: '', password: ''},
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
