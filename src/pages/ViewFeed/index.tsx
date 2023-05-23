import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {saveNews} from '../../services/dbHelpers/newsHelpers';
import images from '../../constants/images';

interface Props {
  route: {
    params: {
      id: string;
      title: string;
      urlToImage: string;
      description: string;
      shortTitle: string;
    };
  };
}

const ViewFeed: React.FC<Props> = ({route, navigation}) => {
  const {title, description, urlToImage, publishedAt, content} = route.params;
  const headerTxt = title.slice(0, 10);
  const [isSaved, setIsSaved] = useState(false);

  const handleSavePress = () => {
    console.log('save pressed');
    const data = {title, description, urlToImage, publishedAt, content};
    saveNews(data);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.ic_back}
            style={{height: 24, width: 24, tintColor: '#FFF', marginLeft: 10}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#FFF',
            fontSize: 16,
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          {headerTxt}
        </Text>
      </View>
      <Image style={styles.newsImage} source={{uri: urlToImage}} />
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsDescription}>{description}</Text>
        <Text style={styles.newsDescription}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0D201',
    height: 55,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#1877f2',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#888',
  },
  newsDescription: {
    fontSize: 16,
    color: '#888',
  },
});

export default ViewFeed;
