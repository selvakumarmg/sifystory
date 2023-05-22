/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSharedValue, withTiming} from 'react-native-reanimated';

const AppSplash: React.FC = () => {
  const appNameOpacity = useSharedValue(0);

  useEffect(() => {
    const showAppName = () => {
      appNameOpacity.value = withTiming(1, {duration: 1000});
    };

    // Hide the native splash screen once the component mounts
    SplashScreen.hide();

    // Show the app name after a delay
    setTimeout(showAppName, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.appName, {opacity: appNameOpacity}]}>
        SiFy Stories
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AppSplash;
