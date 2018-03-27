import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView } from 'react-native';
import {connect} from 'react-redux'
import { fetchPosts, editPost } from '../store/posts'
import RecursivePosts from './RecursivePosts';
class AllPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <View style={styles.view}>
        <ScrollView>
          <Text style={styles.pieceName}>{this.props.piece.name}</Text>
          <Text style={styles.artistName}>
            by {this.props.piece.artist.name}
          </Text>
          <RecursivePosts editPost={this.props.editPost} posts={this.props.posts} parentId={null} depth={0} />
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
    view:{
        marginTop: 25
    },
    pieceName: {
        fontSize: 25,
        textAlign: 'center'
    },
    artistName: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 25
    }

  });

mapStateToProps = state => ({
    posts: state.posts,
    piece: state.piece
})

  const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    editPost: (post, id) => dispatch(editPost(post, id))
  })

  export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)


