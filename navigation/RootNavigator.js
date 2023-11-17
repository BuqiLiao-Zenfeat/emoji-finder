import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EmojiSearchScreen from '../Screens/EmojiSearchScreen';
import EmojiDetailsScreen from '../Screens/EmojiDetailsScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Emoji Search" component={EmojiSearchScreen} />
      <Stack.Screen name="Emoji Details" component={EmojiDetailsScreen} options={{presentation:"transparentModal"}} />
    </Stack.Navigator>
  );
}