import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { fetchPosts, editPost } from '../store/posts';
import {connect} from 'react-redux';

class RecursivePosts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            replyContent: ''
        }
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
        this.filteredPosts = this.props.posts.filter(post => post.parentId === this.props.parentId);
        this.sortedPostsVotes = this.filteredPosts.sort(function(a, b) {
            return b.votes - a.votes;
        });
        this.sortedPostsTime = this.filteredPosts.sort(function(a, b) {
            return Number(b.createdAt) - Number(a.createdAt);
        });
        return (
            <View style={styles.mainView}>
                {
                    this.sortedPostsVotes && this.sortedPostsVotes.map(item => (
                        <View key={item.id} style={styles.postContainer} >
                            <Text
                                style={{ fontSize: 14 }}>{item.content}</Text>
                            <View style={styles.votesAndIcons}>
                                <TouchableOpacity
                                    style={{
                                        marginRight: 10
                                    }}
                                    onPress={() => this.props.touchReply(item.id)}>
                                    <Image
                                        source={require('../resources/icons/reply.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.updateVotes(item, item.votes + 1)}>
                                    <Image
                                        source={require('../resources/icons/up-arrow-grey.png')}
                                        style={{ width: 22, height: 22 }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.vote}>
                                    <Text style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }}>
                                        {item.votes}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.updateVotes(item, item.votes - 1)}>
                                    <View>
                                        <Image
                                            source={require('../resources/icons/up-arrow-grey.png')}
                                            style={{
                                                width: 22, height: 22,
                                                transform: [{
                                                    rotate: '180deg'
                                                }]
                                            }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <RecursivePosts
                                posts={this.props.posts}
                                editPost={this.props.editPost}
                                parentId={item.id}
                                touchReply={this.props.touchReply} />
                        </View>
                    ))
                }
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
