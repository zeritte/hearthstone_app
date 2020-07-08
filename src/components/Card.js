import * as React from 'react';
import {View, Animated, TouchableOpacity, Text, Image} from 'react-native';

export const Card = ({data}) => {
  const animatedValue = new Animated.Value(0);
  let count = 0;

  const transformFront = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const transformBack = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flip = () => {
    count++;
    console.log('flip -> count', count % 2);
    Animated.spring(animatedValue, {
      toValue: count % 2 === 0 ? 0 : 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity onPress={flip}>
      <Animated.View
        style={{
          backfaceVisibility: 'hidden',
          transform: [
            {
              rotateY: transformFront,
            },
          ],
        }}>
        {data.img ? (
          <>
            <Image
              source={{uri: data.img}}
              style={{
                width: '100%',
                aspectRatio: 1,
                marginVertical: 5,
                borderWidth: 1,
              }}
            />
            <Text style={{fontSize: 18, marginBottom: 20}}>{data.name}</Text>
          </>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                aspectRatio: 1,
                marginVertical: 5,
                borderWidth: 1,
              }}
            />
            <Text style={{fontSize: 18, marginBottom: 20}}>{data.name}</Text>
          </>
        )}
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          transform: [
            {
              rotateY: transformBack,
            },
          ],
        }}>
        <View
          style={{
            width: '100%',
            aspectRatio: 1,
            marginVertical: 5,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Card Details</Text>
        </View>
        <Text style={{fontSize: 18, marginBottom: 20}}>{data.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
