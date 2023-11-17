import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import RootNavigator from './navigation/RootNavigator';
import { getFavoriteEmojis } from './utils/localStorageUtils';
import { FavoritesContext } from './Contexts/FavoritesContext';


function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoriteEmojis();
        setFavorites(favorites);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={[favorites, setFavorites]}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style='auto' backgroundColor='white' />
      </NavigationContainer>
    </FavoritesContext.Provider>
  )
}

export default function Root() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <App />
    </SafeAreaProvider>
  );
}

