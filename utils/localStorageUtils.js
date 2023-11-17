import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavoriteEmojis = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favorites')
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e);
  }
}

export const addFavoriteEmoji = async (emojiName) => {
  try {
    const favorites = await getFavoriteEmojis();
    favorites.push(emojiName);
    await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  } catch(e) {
    console.log(e);
  }
}

export const removeFavoriteEmoji = async (emojiName) => {
  try {
    const favorites = await getFavoriteEmojis();
    const updatedFavorites = favorites.filter((favorite) => favorite !== emojiName);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
  } catch(e) {
    console.log(e);
  }
}
