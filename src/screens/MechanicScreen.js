import * as React from 'react';
import {FlatList, Text, Image} from 'react-native';
import {Card} from '../components';

import {useSelector} from 'react-redux';

export default function MechanicScreen({route}) {
  const {mechanicId} = route.params;
  const {cardsByMechanics} = useSelector(state => state.main);
  const cardsToBeRendered = React.useMemo(() => {
    return cardsByMechanics.filter(e => e.mechanicId === mechanicId);
  }, [cardsByMechanics, mechanicId]);

  const renderItem = ({item, index}) => {
    return <Card data={item} />;
  };

  return (
    <FlatList
      style={{flex: 1, width: '90%', alignSelf: 'center'}}
      data={cardsToBeRendered}
      renderItem={renderItem}
      keyExtractor={item => item.cardId}
    />
  );
}
