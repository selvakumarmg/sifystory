import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import BottomSheet from '../components/BottomSheet';
import colors from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {updateProfile} from '../services/dbHelpers/newsHelpers';
import images from '../constants/images';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

const EditProfilePage = ({route}) => {
  const {email} = route.params;
  const initialProfile: Profile = {
    firstName: '',
    lastName: '',
    email: email,
    profileImage: '',
  };

  const navigation = useNavigation();
  const handleSaveProfile = (values: Profile) => {
    updateProfile(values)
      .then(status => {
        if (status) {
          navigation.goBack();
        }
      })
      .catch(error => {
        // Error occurred during the update, handle the error
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.primary,
          height: 50,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.ic_back}
            style={{height: 24, width: 24, tintColor: '#FFF', marginLeft: 20}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFF',
            marginLeft: 20,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Edit Profile
        </Text>
      </View>
      <Formik
        initialValues={initialProfile}
        onSubmit={handleSaveProfile}
        validate={values => {
          const errors: Partial<Profile> = {};
          if (!values.firstName) {
            errors.firstName = 'First name is required';
          }
          if (!values.profileImage) {
            errors.profileImage = 'Profile Image is required';
          }

          if (!values.lastName) {
            errors.lastName = 'Last name is required';
          }

          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}>
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          isValidating,
        }) => (
          <View style={{margin: 20, width: '90%', alignItems: 'center'}}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: values.profileImage}}
                style={styles.profileImage}
              />
              <BottomSheet
                onSelectImage={res =>
                  setFieldValue(
                    'profileImage',
                    'data:image/jpeg;base64,' + res.assets[0].base64
                  )
                }
              />
              {errors.profileImage && touched.profileImage && (
                <Text style={styles.errorText}>{errors.profileImage}</Text>
              )}
            </View>

            <TextInput
              style={styles.input}
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              placeholder="Last Name"
            />
            {errors.lastName && touched.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              style={styles.input}
              value={values.email}
              editable={false}
              onChangeText={handleChange('email')}
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isValidating}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    backgroundColor: '#EFEFEF',
  },
  changeImageText: {
    color: 'blue',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#BDBDBD',
  },
  button: {
    backgroundColor: colors.primary,
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionButtonText: {
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
