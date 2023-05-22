import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import ViewFeed from '../pages/ViewFeed';
import Profile from '../pages/Profile';
import UpdateProfile from '../pages/UpdateProfile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Dashboard'}}
      />
      <Stack.Screen
        name="ViewFeed"
        component={ViewFeed}
        options={{title: 'ViewFeed'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{title: 'UpdateProfile'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
