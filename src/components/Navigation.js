import * as React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MechanicScreen from '../screens/MechanicScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Search')}
            title="Search"
            color="#000"
          />
        ),
      })}
    />
    <Stack.Screen name="Mechanic" component={MechanicScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
  </Stack.Navigator>
);
