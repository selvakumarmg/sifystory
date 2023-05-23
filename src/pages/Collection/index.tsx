import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  deleteAllSavedNews,
  getSaveItems,
} from '../../services/dbHelpers/newsHelpers';
import NewsListItem from '../../components/NewsListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import styles from './styles';

type NewsItem = {
  id: string;
  title: string;
  description: string;
};

const Collections: React.FC = ({navigation}) => {
  const isFocused = useIsFocused();
  const [savedItems, setSavedItems] = useState<NewsItem[]>([]);
  useEffect(() => {
    if (isFocused) {
      getNewsFromDB();
    }
  }, [isFocused]);

  const getNewsFromDB = () => {
    getSaveItems()
      .then(items => {
        // Do something with the retrieved items
        console.log('items', items);
        setSavedItems(items);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved News</Text>
        <Button
          labelStyle={{color: '#FFF'}}
          style={{position: 'absolute', right: 10}}
          onPress={() => {
            deleteAllSavedNews();
            getNewsFromDB();
          }}>
          Delete All
        </Button>
      </View>
      {savedItems.length > 0 ? (
        <SwipeListView
          data={savedItems}
          renderItem={({item}) => (
            <NewsListItem item={item} navigation={navigation} tag="saved" />
          )}
          leftOpenValue={75}
          rightOpenValue={75}
          keyExtractor={item => item.title}
        />
      ) : (
        <Text style={styles.emptyText}>No saved items found.</Text>
      )}
    </View>
  );
};

export default Collections;
