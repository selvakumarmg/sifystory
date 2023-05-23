/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Collection from '../Collection';
import images from '../../constants/images';
import colors from '../../constants/colors';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = images.ic_discover;
          } else if (route.name === 'Collection') {
            iconName = images.ic_bookmark;
          }

          return (
            <Image
              source={iconName}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: '#BDBDBD',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collection" component={Collection} />
    </Tab.Navigator>
  );
};

export default Dashboard;
