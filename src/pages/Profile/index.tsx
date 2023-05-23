import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchUserDetails} from '../../services/dbHelpers/newsHelpers';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../constants/images';
import styles from './styles';

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
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setProfileImage(user.profileImage);
          setEmail(user.email);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={images.ic_back} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableWithoutFeedback onPress={handleEditProfile}>
          <Text style={styles.editText}>Edit Profile</Text>
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

export default ProfilePage;
