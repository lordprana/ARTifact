import { StyleSheet } from 'react-native';
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
  ocrText: {
    marginTop: Constants.statusBarHeight + 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  ocrButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10
  },
  ocrButtonBackground: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    elevation: 3,
  },
  ocrButtonIcon: {
    width: 50,
    height: 50
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
  }

});

export default styles;
