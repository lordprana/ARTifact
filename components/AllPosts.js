import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Animated, Keyboard } from 'react-native';
import {connect} from 'react-redux';
import { fetchPosts, editPost, addPost, postSavedPiece, deleteSavedPiece } from '../store';
import RecursivePosts from './RecursivePosts';
import CreatePost from './CreatePost';
import FullWidthImage from './FullWidthImage';
class AllPosts extends React.Component {
  constructor(props) {
    super(props);

    let isFavoritePiece = !!props.user.pieces.filter(piece => {
      return props.piece.id === piece.id;
    }).length;

    this.state = {
      replyParent: null,
      replyContent: '',
      favorited: isFavoritePiece
    };
    this.replyPosition = new Animated.Value(-50);
    this.touchReply = this.touchReply.bind(this);
    this.handleFavoriteTouch = this.handleFavoriteTouch.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.replyPosition.setValue(e.endCoordinates.height);
  }

  _keyboardDidHide(e) {
    this.replyPosition.setValue(-50);
  }

  touchReply = (parentId) => {
    this.setState({replyParent: parentId});
    this.replyField.focus();
  }

  handleSubmitReply() {
    this.props.addPost({
      content: this.state.replyContent,
      parentId: this.state.replyParent,
      pieceId: this.props.piece.id,
      userId: this.props.user.id
    });
    this.setState({
      replyContent: ''
    });
    Animated.timing(
      this.replyPosition,
      {
        toValue: -50
      }
    ).start();
    Keyboard.dismiss();
  }

  handleFavoriteTouch() {
    if (this.state.favorited) this.props.deleteSavedPiece(this.props.piece);
    else this.props.postSavedPiece(this.props.piece);

    this.setState({
      favorited: !this.state.favorited
    });
  }

  render() {
    return (
      <View style={styles.view}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image source={require('../resources/icons/back-arrow-button.png')}/>
        </TouchableOpacity>
      </View>
        <View style={styles.heartTouchable}>
          <TouchableWithoutFeedback onPress={() => this.handleFavoriteTouch()}>
            {
              this.state.favorited
                ? <Image source={require('../resources/icons/heart-full.png')} />
                : <Image source={require('../resources/icons/heart-outline.png')} />
            }
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.pieceName}>{this.props.piece.name}</Text>
        <Text style={styles.artistName}>
          by {this.props.piece.artist.name}
        </Text>
        <ScrollView>
          {this.props.piece.pictureUrl &&
            <FullWidthImage
              style={styles.image}
              source={{ uri: this.props.piece.pictureUrl }} />
          }
          <TouchableOpacity onPress={() => this.touchReply(null)}>
            <View style={styles.addPostButton}>
              <Text style={{ color: 'white' }}>Add Post</Text>
            </View>
          </TouchableOpacity>
          <RecursivePosts
            editPost={this.props.editPost}
            posts={this.props.posts}
            parentId={null}
            touchReply={this.touchReply} />
        </ScrollView>
        { /* Reply text field */}
        <Animated.View style={{
          position: 'absolute',
          bottom: this.replyPosition,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderColor: 'black',
          paddingVertical: 5,
          paddingHorizontal: 5
        }}>
          <TextInput
            placeholder="Add post..."
            value={this.state.replyContent}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            onChangeText={(replyContent) =>
              this.setState({ replyContent })}
            ref={ref => {this.replyField = ref}}
            style={{
              flex: 1
            }}
          />
          <TouchableOpacity onPress={() => this.handleSubmitReply()}>
            <Image
              source={require('../resources/icons/send-button.png')}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    view: {
        marginTop: 25,
        flex: 1,
    },
    backButton: {
      position: 'absolute',
      top: 5,
      left: 10,
      zIndex: 1
    },
    pieceName: {
        fontSize: 25,
        textAlign: 'center'
    },
    artistName: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 12
    },
    image: {
      marginBottom: 15
    },
    heartTouchable: {
      position: 'absolute',
      top: 5,
      right: 10,
      zIndex: 1
    },
    addPostButton: {
        backgroundColor: '#4286f4',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20
    }

  });

const mapStateToProps = state => ({
    posts: state.posts,
    piece: state.piece,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  editPost: (post, id) => dispatch(editPost(post, id)),
  addPost: (post) => dispatch(addPost(post)),
  deleteSavedPiece: (piece) => dispatch(deleteSavedPiece(piece)),
  postSavedPiece: (piece) => dispatch(postSavedPiece(piece))
});

  export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);

