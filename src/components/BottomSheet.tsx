import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const BottomSheet = ({onSelectImage}) => {
  const bottomSheetRef = useRef(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          console.log('Res', response);
          onSelectImage(response);
        }
        bottomSheetRef.current.close();
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        console.log('Res', response.assets[0].uri);
        onSelectImage(response);
      }
      bottomSheetRef.current.close();
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpenBottomSheet}>
        <Text style={styles.buttonText}>Upload Profile Image</Text>
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown
        customStyles={{
          container: styles.bottomSheetContainer,
        }}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => captureImage('photo')}>
          <Text style={styles.optionButtonText}>Image from Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.optionButtonText}>Image from Gallery</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#666',
    fontSize: 14,
  },
  bottomSheetContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default BottomSheet;
