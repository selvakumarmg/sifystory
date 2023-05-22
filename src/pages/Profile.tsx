import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchUserDetails} from '../services/dbHelpers/newsHelpers';
import colors from '../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import images from '../constants/images';

const categories: string[] = [
  'Technology',
  'Sports',
  'Entertainment',
  'Politics',
  'Business',
];

const ProfilePage: React.FC = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector(state => state.AuthReducer.user);

  useEffect(() => {
    fetchUserDetails(user.email)
      .then(user => {
        if (user) {
          console.warn(user);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setProfileImage(user.profileImage);
          setEmail(user.email);
        } else {
          console.log('User not found');
        }
      })
      .catch(error => {
        console.log('Error fetching user details:', error);
      });
  }, [isFocused]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    navigation.navigate('UpdateProfile', {email: email});
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
          Profile
        </Text>
        <TouchableWithoutFeedback onPress={handleEditProfile}>
          <Text
            style={{
              color: '#FFF',
              marginLeft: 20,
              fontSize: 14,
              position: 'absolute',
              right: 10,
            }}>
            Edit Profile
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.profileContainer}>
          <Image source={{uri: profileImage}} style={styles.profileImage} />
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View>
          <Text style={styles.heading}>Bio</Text>
          <Text>
            Inquisitive news reader | Uncovering stories that shape our world |
            Seeking truth through headlines | Sharing insightful perspectives |
            Stay informed, stay engaged | Join me on this journey of knowledge
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Your news interests:</Text>
          <View style={styles.tagList}>
            {categories.map(category => (
              <View key={category} style={styles.tag}>
                <Text style={styles.tagName}>{category}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch({type: 'LOGOUT'});
          }}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    fontSize: 16,
    color: 'blue',
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 16,
    backgroundColor: '#BDBDBD',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    width: 200,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'lightgray',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagName: {
    fontSize: 14,
  },
});

export default ProfilePage;
