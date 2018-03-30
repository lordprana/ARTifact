import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getSavedPieces, stockPiece, getPosts } from '../store';
import styles from '../styles';
import { backEndAddress } from '../config';

const handlePiecePress = (stockPosts, stockPiece, piece, navigation) => () => {
  stockPosts(piece.posts);
  delete piece.posts;
  stockPiece(piece);
  navigation.dispatch(
    NavigationActions.reset(
      {
        index: 1,
        actions: [
          NavigationActions.navigate(
            {
              routeName: 'swiper'
            }
          ),
          NavigationActions.navigate(
            {
              routeName: 'AllPosts',
            }
          )
        ]
      })
  );
};

const Pieces = props => (
  <TouchableOpacity onPress={handlePiecePress(props.stockPosts, props.stockPiece, props.piece, props.navigation)}>
    <View  style={museumStyles.postView}>
          <Text style={museumStyles.pieceName}>{props.piece && `${props.piece.name} - ${props.piece.artist.name}`}</Text>
          <View style={museumStyles.imageAndContent}>
            <Image
              style={museumStyles.image}
              source={{ uri: props.piece.pictureUrl }}
            />
            <Text style={museumStyles.textContent}>
              {(props.piece.posts && !!props.piece.posts.length) && props.piece.posts[0].content.slice(0, 95) + (props.piece.posts[0].content.length > 95 ? " ..." : '')}
            </Text>
          </View>
        </View>
  </TouchableOpacity>
);

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      recommendations: null
    };
  }

  componentDidMount() {
    axios.get(`${backEndAddress}/api/recommendations`)
    .then(res => res.data)
    .then(recommendations => this.setState({recommendations}))
    .catch(console.error.bind(console));
  }

  render() {
    return (
      <View style={museumStyles.masterView}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{this.props.name}</Text>
          <Image source={{ uri: this.props.pictureUrl }} style={styles.profilePic} />
        </View>
        <ScrollView style={{flexGrow: 1}}>
          <Text style={styles.userPageSubtitle}>Recommended works</Text>
          {this.state.recommendations && this.state.recommendations.map(piece => (
            <Pieces
              key={piece.id}
              piece={piece}
              stockPosts={this.props.stockPosts}
              stockPiece={this.props.stockPiece}
              navigation={this.props.navigation} />
          ))}
          <Text style={styles.userPageSubtitle}>Saved works</Text>
          {this.props.savedPieces && this.props.savedPieces.map(piece => (
            <Pieces
              key={piece.id}
              piece={piece}
              stockPosts={this.props.stockPosts}
              stockPiece={this.props.stockPiece}
              navigation={this.props.navigation} />
          )
          )}
        </ScrollView>
      </View>
    );
  }
}

const museumStyles = StyleSheet.create({
  masterView: {
    // backgroundColor: 'cornsilk',
    flex: 1,
    paddingBottom: 40
  },
  imageStyle: {
    maxHeight: 25,
    maxWidth: 40,
    flex: 1
  },
  carouselContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#085D00'
  },
  postContainer: {
    // backgroundColor: 'cornsilk',
  },
  pieceName: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 6
  },
  imageAndContent: {
    flexDirection: 'row'
  },
  textContent: {
    fontSize: 15,
    marginLeft: 15,
    flex: 1
  },
  postView: {
    borderBottomWidth: 1,
    borderColor: 'black',
    margin: 5,
    padding: 10
  },
  postsHeaderContainer: {
    marginTop: 10,
    backgroundColor: 'cornsilk',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  postsHeader: {
    fontSize: 20
  },
  image: {
    width: 75,
    height: 75,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapState = state => ({
  name: state.user.name,
  pictureUrl: state.user.pictureUrl,
  savedPieces: state.user.pieces,
});
const mapDispatch = dispatch => ({
  getSavedPieces: () => dispatch(getSavedPieces()),
  stockPosts: posts => dispatch(getPosts(posts)),
  stockPiece: piece => dispatch(stockPiece(piece))
});

export default connect(mapState, mapDispatch)(UserPage);
