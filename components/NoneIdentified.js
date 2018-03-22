import React from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

const NoneIdentified = props => (
  <View style={styles.noneIdentifiedBackground}>
    <Text style={styles.noneIdentifiedText}>
      No art identified.{'\n'}Please try again
    </Text>
    <TouchableOpacity>
      <Image
        style={styles.noneIdentifiedIcon}
        source={require('../resources/icons/refresh-button.png')} />
    </TouchableOpacity>
  </View>
);

export default NoneIdentified;
