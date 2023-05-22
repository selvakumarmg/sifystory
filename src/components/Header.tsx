import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchUserDetails} from '../services/dbHelpers/newsHelpers';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';

const Header = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const user = useSelector(state => state.AuthReducer.user);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  useEffect(() => {
    fetchUserDetails(user.email)
      .then(user => {
        if (user) {
          console.warn(user);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setProfileImage(user.profileImage);
        } else {
          console.log('User not found');
        }
      })
      .catch(error => {
        console.log('Error fetching user details:', error);
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.iconButton} onPress={handleDrawerPress}>
        <Text style={{color: '#000'}}>Menu</Text>
      </TouchableOpacity> */}
      <Text style={styles.title}>SiFy Feeds</Text>
      <TouchableOpacity style={styles.iconButton} onPress={handleProfilePress}>
        {profileImage ? (
          <Image
            source={{uri: profileImage}}
            style={{
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 50,
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: '#B0D201',
              borderRadius: 50,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
              {firstName.charAt(0)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
    elevation: 4,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B0D201',
  },
});

export default Header;
