import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const softMenuBarHeight = Dimensions.get('screen').height
                          - Dimensions.get('window').height

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
    bottom: softMenuBarHeight + Dimensions.get('screen').height * 0.03,
    right: Dimensions.get('screen').width * 0.03,
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
  switchCameraButton: {
    position: 'absolute',
    bottom: softMenuBarHeight + Dimensions.get('screen').height * 0.03,
    left: Dimensions.get('screen').width * 0.03,
    padding: 10
  },
  switchCameraBackground: {
    backgroundColor: '#00246F',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    elevation: 3,
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
    width: Dimensions.get('screen').width,
    position: 'absolute',
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
  },
  userHeader: {
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#6772e5',
  },
  userName: {
    color: 'white',
    fontSize: 36,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  savedPiece: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d3d5ea',
    marginBottom: 20,
  },
  savedPieceSeparator: {
    display: 'flex',
    flexDirection: 'row',
  },
  savedPiecePic: {
    width: 96,
    height: 96,
    resizeMode: 'cover',
    marginRight: 20,
  },
  savedPieceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  savedPieceText: {
    fontSize: 18,
  },
  savedPieceTextContainer: {
    paddingVertical: 6,
  },
  userPageSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 6,
  },
  tempArrow: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});

export default styles;
