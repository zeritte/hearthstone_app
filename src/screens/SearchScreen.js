import * as React from 'react';
import {View, Text, TextInput, ActivityIndicator, FlatList} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {searchByCardName, setSearchTextToNull} from '../actions';

export default function MechanicScreen() {
  const [name, setName] = React.useState(null);
  const dispatch = useDispatch();
  const {searchLoading, searchError, searchResults, searchText} = useSelector(
    state => state.main,
  );

  React.useEffect(() => {
    return () => dispatch(setSearchTextToNull());
  }, []);

  const isCurrentValueSearched = searchText === name;

  const finalSearchResults = isCurrentValueSearched ? searchResults : [];

  console.info(
    finalSearchResults.length,
    isCurrentValueSearched,
    searchText,
    name,
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
    return <Text style={{fontSize: 18}}>{item.name}</Text>;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TextInput
        value={name}
        style={{height: 50, borderWidth: 1, borderRadius: 10, width: '80%'}}
        onChangeText={onChangeText}
      />
      <FlatList
        data={finalSearchResults}
        ListHeaderComponent={
          isCurrentValueSearched && <Text>Search results for {searchText}</Text>
        }
        renderItem={renderItem}
        keyExtractor={item => item.cardId}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
}
