import * as React from 'react';
import {FlatList} from 'react-native';
import {Card} from '../components';

import {useSelector} from 'react-redux';

export default function MechanicScreen({route}) {
  const {mechanicId} = route.params;
  const {cardsByMechanics} = useSelector(state => state.main);

  const renderItem = ({item, index}) => {
    return <Card data={item} />;
  };

  return (
    <FlatList
      data={cardsByMechanics.filter(e => e.mechanicId === mechanicId)}
      renderItem={renderItem}
      keyExtractor={item => item.cardId}
    />
  );
}
