import React from 'React'
// import { Image, View, TouchableOpacity, StyleSheet, Dimensions, CameraRoll, Alert } from 'react-native'
// import { Permissions, FileSystem } from 'expo';
import BackgroundImage from './BackgroundImage'
// import styles from '../styles'

// const styles = StyleSheet.create({
//   ocrButton: {
//     position: 'absolute',
//     bottom: Dimensions.get('screen').height * 0.03,
//     right: Dimensions.get('screen').width * 0.03,
//     padding: 10
//   },
//   ocrButtonBackground: {
//     backgroundColor: 'white',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 100,
//     shadowColor: 'black',
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 1,
//     elevation: 3,
//   },
//   ocrButtonIcon: {
//     width: 50,
//     height: 50
//   },
// })

const StyledViewer = props => (
  <BackgroundImage image={'data:image/jpeg;base64,' + props.navigation.state.params.styled64}>
    {/* <TouchableOpacity
      style={styles.ocrButton}
      onPress={async () => {
        // have tried many variations on this, but sadly expo is a piece of shit so I don't think this will ever work
        console.log('asking permission...')
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
          console.log('saving photo...')
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'test.jpg', props.navigation.state.params.styled64)
          CameraRoll.saveToCameraRoll(FileSystem.documentDirectory + 'test.jpg', 'photo')
          .then(res => console.log(res))
          .catch(err => console.log(err))
        } else {
          console.log('permission not granted :(')
        }
      }}
    >
      <View style={styles.ocrButtonBackground}>
        <Image
          style={styles.ocrButtonIcon}
          source={require('../resources/icons/download-button.png')}
        />
      </View>
    </TouchableOpacity> */}
  </BackgroundImage>
)

export default StyledViewer
