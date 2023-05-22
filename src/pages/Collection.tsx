import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  deleteAllSavedNews,
  getSaveItems,
} from '../services/dbHelpers/newsHelpers';
import NewsListItem from '../components/NewsListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import images from '../constants/images';
import colors from '../constants/colors';

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
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.primary,
          height: 50,
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image source={images.ic_back} style={{height:24,width:24,tintColor:'#FFF',marginLeft:20}} />
        </TouchableOpacity> */}
        <Text
          style={{
            color: '#FFF',
            marginLeft: 20,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Saved News
        </Text>
        <Button
          labelStyle={{color: '#FFF'}}
          style={{position: 'absolute', right: 10}}
          onPress={() => {
            deleteAllSavedNews();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newsItemContainer: {
    marginBottom: 16,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newsItemDescription: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default Collections;
