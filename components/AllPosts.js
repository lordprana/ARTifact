import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Animated, Keyboard } from 'react-native';
import {connect} from 'react-redux';
import { fetchPosts, editPost, addPost } from '../store/posts';
import RecursivePosts from './RecursivePosts';
import CreatePost from './CreatePost';
import FullWidthImage from './FullWidthImage';
class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyParent: null,
      replyContent: ''
    };
    this.replyPosition = new Animated.Value(-50);
    this.touchReply = this.touchReply.bind(this);
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
    Animated.timing(
      this.replyPosition,
      {
        toValue: 0
      }
    ).start();
    this.setState({replyParent: parentId});
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

  render() {
    console.log('POSTS', this.props.posts);
    return (
      <View style={styles.view}>
          <Text style={styles.pieceName}>{this.props.piece.name}</Text>
          <Text style={styles.artistName}>
            by {this.props.piece.artist.name}
          </Text>
          <ScrollView>
            { this.props.piece.pictureUrl &&
              <FullWidthImage
                style={styles.image}
                source={{uri: this.props.piece.pictureUrl}} />
            }
            <CreatePost />
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
              placeholder="Reply..."
              value={this.state.replyContent}
              multiline={true}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={(replyContent) =>
                this.setState({ replyContent })}
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
        flex: 1
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
    }

  });

mapStateToProps = state => ({
    posts: state.posts,
    piece: state.piece,
    user: state.user
});

  const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    editPost: (post, id) => dispatch(editPost(post, id)),
    addPost: (post) => dispatch(addPost(post))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);

