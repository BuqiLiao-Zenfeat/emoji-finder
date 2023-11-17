import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Button, Icon, ButtonGroup } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import EmojiListItem from '../components/EmojiListItem';
import { removeHyphensFromCategory } from '../utils/emojiUtils';

const categories = [
  'smileys-and-people', 'animals-and-nature', 'food-and-drink', 
  'travel-and-places', 'activities', 'objects', 'symbols', 'flags'
];

export default function EmojiSearchScreen({ navigation }) {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        let endpoint = 'https://emojihub.yurace.pro/api/all';
        if (selectedIndex !== null){
          endpoint += `/category/${categories[selectedIndex]}`;
        }
        const response = await axios.get(endpoint);
        setEmojis(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmojis();
  }, [selectedIndex]);

  const filteredEmojis = emojis.filter((emoji) => {
    return emoji.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const randomEmojiOnPress = async () => {
    try {
      const response = await axios.get("https://emojihub.yurace.pro/api/random");
      navigation.navigate('Emoji Details', {item: response.data});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput 
          style={styles.searchBar}
          placeholder="Search for emoji" 
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button color="#1C2FDB" containerStyle={{marginLeft: 5}} onPress={randomEmojiOnPress}>
          <Icon type="font-awesome-5" name="dice" color="white"/>
        </Button>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      >
        <ButtonGroup
          buttons={removeHyphensFromCategory(categories)}
          selectedIndex={selectedIndex}
          onPress={(index) => {
            if (index === selectedIndex) {
              return setSelectedIndex(null);
            }
            setSelectedIndex(index);
          }}
          innerBorderStyle={{width: 0}}
          containerStyle={styles.categoryButtonGroupContainer}
          buttonStyle={styles.categoryButton}
        />
      </ScrollView>
      <View style={styles.emojiListContainer}>
        <FlatList
          data={filteredEmojis}
          renderItem={({ item }) => <EmojiListItem item={item} />}
          keyExtractor={item => item.name}
          style={styles.emojiList}
          showsVerticalScrollIndicator={false}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: "78%",
    height: "100%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  categoryButtonGroupContainer: {
    height: 40,
    borderWidth: 0,
    marginTop: 15,
  },
  categoryButton: {
    height: 40,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  emojiListContainer: {
    flex: 1,
    width: '90%',
  },
  emojiList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  }
});
