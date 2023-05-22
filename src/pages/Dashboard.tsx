/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// Import your screen components
import Home from '../pages/Home';
import Search from '../pages/Search';
import Collection from '../pages/Collection';
import images from '../constants/images';

// Create a bottom tab navigator
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
        activeTintColor: '#B0D201',
        inactiveTintColor: '#BDBDBD',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collection" component={Collection} />
    </Tab.Navigator>
  );
};

export default Dashboard;
