import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {fetchAllCards} from '../actions';

export default function HomeScreen({navigation}) {
  const {mechanicsLoading, mechanics, mechanicsError} = useSelector(
    state => state.main,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllCards());
  }, []);

  const emptyComponent = () => {
    if (mechanicsLoading) return <ActivityIndicator />;
    else return <Text>{mechanicsError}</Text>;
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{margin: 10}}
        onPress={() => navigation.navigate('Mechanic', {mechanicId: item.id})}>
        <Text style={{fontSize: 18}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={mechanics}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={emptyComponent}
    />
  );
}
