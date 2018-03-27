import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView, Image, TouchableHighlight } from 'react-native';
import { fetchPosts, editPost } from '../store/posts';
import {connect} from 'react-redux';

class RecursivePosts extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.filteredPosts = nextProps.posts.filter(post => post.parentId === this.props.parentId);
        this.sortedPostsVotes = this.filteredPosts.sort(function(a, b) {
            return b.votes - a.votes;
        });
        this.sortedPostsTime = this.filteredPosts.sort(function(a, b) {
            return Number(b.createdAt) - Number(a.createdAt);
        });
    }

    updateVotes(post, votes){
        this.props.editPost(
            {
                ...post,
                votes
            },
            post.id
        );
    }

    render() {
        return (
            <View style={styles.mainView}>
                <FlatList
                    data={this.sortedPostsVotes}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                        return (
                            <View
                                key={item.id}
                                style={styles.postContainer}
                            >
                                <Text
                                    style={{ fontSize: 14 }}>{item.content}</Text>
                                    <View style={styles.votesAndIcons}>
                                    <TouchableHighlight onPress={() => this.updateVotes(item, item.votes + 1)}>
                                        <Image
                                            source={require('../resources/icons/up-arrow-grey.png')}
                                            style={{ width: 22, height: 22 }}
                                        />
                                    </TouchableHighlight>
                                    <View style={styles.vote}>
                                        <Text style={{
                                            flex: 1,
                                            justifyContent: 'center'
                                        }}>
                                            {item.votes}</Text>
                                    </View>
                                    <TouchableHighlight
                                        onPress={() => this.updateVotes(item, item.votes - 1)}>
                                        <Image
                                            source={require('../resources/icons/up-arrow-grey.png')}
                                            style={{ width: 22, height: 22,
                                            transform: [{
                                                rotate: '180deg'
                                            }] }} />
                                    </TouchableHighlight>
                                </View>
                                <RecursivePosts key={item.id} posts={this.props.posts} editPost={this.props.editPost}
                                 parentId={item.id} depth={this.props.depth + 1} />
                            </View>

                        );
                    }
                    }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainView: {
        paddingLeft: 10
    },
  postContainer: {
    paddingBottom: 5,
    borderLeftWidth: 2,
    paddingLeft: 10,
    borderColor: '#8FBC8F'
},
  votesAndIcons: {
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginRight: 8,
      marginTop: 4,
      marginBottom: 4
  },
  vote: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5
  }
});

const mapDispatch = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(null, mapDispatch)(RecursivePosts);
