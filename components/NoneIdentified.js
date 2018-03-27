import React from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

const _onPress = (navigation) => () => {
  navigation.goBack();
}

const NoneIdentified = props => (
  <View style={styles.noneIdentifiedBackground}>
    <Text style={styles.noneIdentifiedText}>
      No art identified.{'\n'}Please try again
    </Text>
    <TouchableOpacity onPress={_onPress(props.navigation)}>
      <Image
        style={styles.noneIdentifiedIcon}
        source={require('../resources/icons/refresh-button.png')} />
    </TouchableOpacity>
  </View>
);

export default NoneIdentified;
