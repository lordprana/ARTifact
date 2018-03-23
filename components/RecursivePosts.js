import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView, Image, TouchableHighlight } from 'react-native';
import { fetchPosts } from '../store/posts'

class RecursivePosts extends React.Component{
    constructor(props) {
        super(props)
        const posts = this.props.posts
        this.filteredPosts = posts.filter(post => post.parentId === this.props.parentId)
        this.sortedPostsVotes = this.filteredPosts.sort(function(a, b){
            return b.votes - a.votes
        })

        this.sortedPostsTime = this.filteredPosts.sort(function(a, b){
            return Number(b.createdAt) - Number(a.createdAt)
        })
    }
    render(){

    
    return (
        <View style={styles.mainView}>
        <FlatList
            data={this.sortedPostsVotes}
            renderItem={({ item }) => {
                return (
            <View
                style={styles.postContainer}
            >
            <View style={styles.subjectLineView}>
                <Text style={styles.subjectLine}>{
                    item.subjectLine === null ?
                        null :
                        item.subjectLine}
                </Text>
                </View>
                <View style={styles.votesAndIcons}>
                <TouchableHighlight onPress={()=>item.votes-1}>
                <Image 
                    source = {require('../public/img/Minus.png')}
                    style={{width: 26, height: 26}} 
                    />
                </TouchableHighlight>
                <View style={styles.vote}>
                    <Text style={{
                        flex: 1,
                        justifyContent: 'center',
                        transform: [
                            { rotate: '315deg' }]
                    }}>
                        {item.votes}</Text>
                        </View>
                        <TouchableHighlight 
                        onPress={()=>item.votes+1}>
                        <Image 
                    source = {require('../public/img/Plus.png')}
                    style={{width: 27, height: 27}} />
                    </TouchableHighlight>
                </View>
                <Text
                    style={{ fontSize: 14 }}>{item.content}</Text>
                <RecursivePosts posts={this.props.posts} parentId={item.id} depth={this.props.depth + 1} />
            </View>
            
        )
    }
    }
        />
        </View>
    )
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
    borderColor: '#8FBC8F'},
  subjectLineView: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subjectLine: {
      fontSize: 16,
      fontFamily: "Georgia"
  },
  votesAndIcons: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      margin: 5
  },
  vote: {
    backgroundColor: '#78AB46',
    width: 20,
    height: 20,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    transform: [
      {rotate: '45deg'}
    ]    
  }
});

const mapDispatch = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
})

export default connect(null, mapDispatch)(RecursivePosts)