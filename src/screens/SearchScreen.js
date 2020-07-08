import * as React from 'react';
import {View, Text, TextInput, ActivityIndicator, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {searchByCardName, setSearchToNull} from '../actions';
import {Card} from '../components';

export default function MechanicScreen() {
  const [name, setName] = React.useState(null);
  const dispatch = useDispatch();
  const {searchLoading, searchError, searchResults, searchText} = useSelector(
    state => state.main,
  );

  React.useEffect(() => {
    return () => dispatch(setSearchToNull());
  }, []);

  const isCurrentValueSearched = React.useMemo(() => searchText === name, [
    searchText,
    name,
  ]);

  const finalSearchResults = React.useMemo(
    () => (isCurrentValueSearched ? searchResults : []),
    [isCurrentValueSearched, searchResults],
  );

  const onChangeText = text => {
    setName(text);
    dispatch(searchByCardName(text));
  };

  const emptyComponent = () => {
    if (searchError) return <Text>{searchError}</Text>;
    else if (searchLoading || !isCurrentValueSearched)
      return <ActivityIndicator />;
    else return null;
  };

  const renderItem = ({item, index}) => {
    return <Card data={item} />;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TextInput
        value={name}
        style={{
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          width: '80%',
          marginBottom: 20,
        }}
        onChangeText={onChangeText}
      />
      <FlatList
        style={{flex: 1, width: '90%'}}
        data={finalSearchResults}
        ListHeaderComponent={
          isCurrentValueSearched && (
            <Text style={{marginBottom: 20, fontWeight: 'bold'}}>
              Search results for {searchText}
            </Text>
          )
        }
        renderItem={renderItem}
        keyExtractor={item => item.cardId}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
}
