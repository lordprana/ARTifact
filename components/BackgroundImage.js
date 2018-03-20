import React from 'react'
import { ImageBackground } from 'react-native'
import styles from '../styles'

const BackgroundImage = props => (
  <ImageBackground
    source={typeof props.image === 'string' ? { uri: props.image } : props.image}
    style={styles.backgroundImage}>
    {props.children}
  </ImageBackground>
)

export default BackgroundImage
