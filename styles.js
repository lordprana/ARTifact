import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    // resizeMode: 'cover',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 6,
  },
  disambiguateContainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  disambiguateItem: {
    height: 60,
    paddingLeft: 20,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  disambiguateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  disambiguateText: {
    fontSize: 20
  },
  loadingImage: {
    height: Dimensions.get('screen').height,
    position: 'absolute'
  },
  loadingText: {
    fontSize: 40,
    color: 'white'
  },
  ocrCamera: {
    height: Dimensions.get('screen').height,
    position: 'absolute'
  },
  noneIdentifiedBackground: {
    backgroundColor: '#4286f4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noneIdentifiedText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40
  },
  noneIdentifiedIcon: {
    height: 36,
    width: 36
  }

});

export default styles;
