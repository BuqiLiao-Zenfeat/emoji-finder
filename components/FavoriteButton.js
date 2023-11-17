import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed';

import { FavoritesContext } from '../Contexts/FavoritesContext';

import { addFavoriteEmoji, removeFavoriteEmoji } from '../utils/localStorageUtils';


export default function FavoriteButton({ ...props }) {
  const { item } = props;
  const [favorites, setFavorites] = useContext(FavoritesContext);

  return (
    favorites.includes(item.name) ? (
      <TouchableOpacity 
        onPress={() => {
          removeFavoriteEmoji(item.name);
          setFavorites(favorites.filter((emoji) => emoji !== item.name));
        }}
        style={styles.favoriteButton}
      >
        <Icon type="font-awesome-5" name="heart" color="red" size={20}/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity 
        onPress={() => {
          addFavoriteEmoji(item.name);
          setFavorites([...favorites, item.name]);
        }}
        style={styles.favoriteButton}
      >
        <Icon type="font-awesome-5" name="heart" color="black" size={20}/>
      </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    marginRight: 10,
  },
});