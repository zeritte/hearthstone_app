import * as React from 'react';
import {View, Text, TextInput} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

export default function MechanicScreen() {
  const dispatch = useDispatch();
  const {cardsByMechanics} = useSelector(state => state.main);

  const onChangeText = text => {
    console.log(text);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TextInput
        style={{height: 50, borderWidth: 1, borderRadius: 10, width: '80%'}}
        onChangeText={onChangeText}
      />
      <Text>results</Text>
    </View>
  );
}
