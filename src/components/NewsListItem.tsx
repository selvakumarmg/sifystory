import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import images from '../constants/images';
import colors from '../constants/colors';
import {
  deleteNews,
  getSaveItems,
  saveNews,
} from '../services/dbHelpers/newsHelpers';
import {
  calculateDaysAgo,
  isTitleAvailable,
} from '../services/dbHelpers/commonHelpers';
import Share from 'react-native-share';

const NewsListItem = ({item, navigation, tag}) => {
  const [isSaved, setIsSaved] = useState(
    isTitleAvailable(getSaveItems(), item.title)
  );

  const onSaveButtonPress = () => {
    const {id, title, description, urlToImage, publishedAt, content} = item;
    const data = {id, title, description, urlToImage, publishedAt, content};
    if (isSaved) {
      deleteNews(item.id);
    } else {
      saveNews(data);
    }

    setIsSaved(!isSaved); // Toggle the saved status
  };

  const renderSaveButton = () => {
    const saveIcon = isSaved ? images.ic_unsave : images.ic_save;
    return (
      <TouchableOpacity onPress={onSaveButtonPress}>
        <Image source={saveIcon} style={styles.newsOptions} />
      </TouchableOpacity>
    );
  };

  const shareImage = async item => {
    const {title, description, urlToImage} = item;

    try {
      const shareOptions = {
        title: title,
        url: urlToImage,
        message: description, // Optional message
        type: 'image/jpeg', // Specify the MIME type of the image
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ViewFeed', {
          title: item.title,
          description: item.description,
          urlToImage: item.urlToImage,
          publishedAt: item.publishedAt,
          content: item.content,
        })
      }>
      <View style={styles.newsItem}>
        <Image style={styles.newsImage} source={{uri: item.urlToImage}} />
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
        <View style={styles.newsFooter}>
          <Text style={styles.postedOnText}>
            {'Posted ' + calculateDaysAgo(item?.publishedAt) + ' day ago'}
          </Text>
          <View style={styles.newsOptionsContainer}>
            {!tag && renderSaveButton()}
            <TouchableOpacity onPress={() => shareImage(item)}>
              <Image source={images.ic_share} style={styles.newsOptions} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewsListItem;

const styles = StyleSheet.create({
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  newsDescription: {
    fontSize: 14,
    color: '#888',
  },
  newsFooter: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  postedOnText: {
    color: colors.primary,
  },
  newsOptionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  },
  newsOptions: {
    height: 18,
    width: 18,
    tintColor: colors.primary,
    marginLeft: 10,
  },
});
