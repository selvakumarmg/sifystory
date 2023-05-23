import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import OptionsList from '../../components/OptionsList';
import images from '../../constants/images';
import NewsListItem from '../../components/NewsListItem';
import {v4 as uuidv4} from 'uuid';
import {Image} from 'react-native';
import {api} from '../../services/api';
import Loader from '../../components/Loader';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([]);
  const [key, setKey] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      setIsLoading(true);
      const response = await api.getFeeds();
      const data = response.data;
      console.warn(data);
      console.log('data', data);
      const newsItemsWithId = data.articles.map(item => ({
        ...item,
        id: uuidv4({
          random: [...Array(16)].map(() => Math.floor(Math.random() * 256)),
        }),
      }));

      setNewsData(newsItemsWithId);
      console.log('newsItemsWithId', newsItemsWithId);
      const uniqueList: string[] = [];

      data.articles.forEach((article: Article) => {
        const {id, name} = article.source;
        const sourceInfo = {id, name};

        if (!uniqueList.includes(sourceInfo)) {
          uniqueList.push(article.source);
        }
      });
      setOptionList(uniqueList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetching news data:', error);
    }
  };

  const handleDeleteItem = index => {
    const updatedArticles = [...newsData];
    updatedArticles.splice(index, 1);
    setNewsData(updatedArticles);
  };

  const renderHiddenItem = (data, rowMap) => (
    <TouchableOpacity
      style={[styles.newsImage, styles.swipeContainer]}
      onPress={() => handleDeleteItem(data.index)}>
      <Image
        source={images.ic_delete}
        style={{width: 32, height: 32, tintColor: '#FFF'}}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <OptionsList
        options={optionList}
        selectedOptionId={key}
        onOptionPress={id => setKey(id)}
      />
      <SwipeListView
        data={newsData}
        renderItem={({item}) => (
          <NewsListItem item={item} navigation={navigation} />
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        keyExtractor={item => item.title}
      />
      <Loader isLoading={isLoading} />
    </View>
  );
};

export default Home;
