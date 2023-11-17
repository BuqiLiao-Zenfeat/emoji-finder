import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FavoritesContext } from '../Contexts/FavoritesContext';
import { unicodeToChar } from '../utils/emojiUtils';
import FavoriteButton from './FavoriteButton';



export default function EmojiListItem({item}){
  const navigation = useNavigation();
  const emojiChar = unicodeToChar(item.unicode);

  return (
    <TouchableHighlight 
      onPress={() => navigation.navigate('Emoji Details', {item: item})}
      underlayColor="rgba(0, 0, 0, .05)"
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.emojiInfoContainer}>
          <Text style={styles.emojiChar}>{emojiChar}</Text>
          <Text style={styles.emojiName}>{item.name}</Text>
        </View>
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton item={item}/>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  emojiInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  favoriteButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  emojiChar: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 8,
  },
  emojiName: {
    fontSize: 15,
    flexShrink: 1,
  }
});