import * as React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {fetchAllMechanics} from '../actions';

export default function HomeScreen() {
  const {mechanicsLoading, mechanics, mechanicsError} = useSelector(
    state => state.main,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllMechanics());
  }, []);

  const emptyComponent = () => {
    if (mechanicsLoading) return <ActivityIndicator />;
    else return <Text>{mechanicsError}</Text>;
  };

  const renderItem = ({item, index}) => {
    return <Text>{item.name}</Text>;
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
