import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { unicodeToChar } from '../utils/emojiUtils';
import FavoriteButton from "../components/FavoriteButton";


export default function EmojiDetailsScreen({ route }) {
  const { item } = route.params;
  const emojiChar = unicodeToChar(item.unicode);

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.emojiChar}>{emojiChar}</Text>
        <View style={styles.detailsInfoContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.detailLabel}>Name: </Text>
            <Text style={styles.detailValue}>{item.name}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.detailLabel}>Category: </Text>
            <Text style={styles.detailValue}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton item={item}/>
        </View>
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
  detailsContainer: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emojiChar: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 8,
  },
  detailsInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 15,
    flexShrink: 1,
  },
  favoriteButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});