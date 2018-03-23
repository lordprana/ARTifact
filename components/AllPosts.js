import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView } from 'react-native';
import { fetchPosts } from '../store/posts'
import RecursivePosts from './RecursivePosts';

class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        
    //    const postsByDate= posts.sort(function(a,b){
    //        const date1 = new Date(a.createdAt)
    //        const date2 = new Date(b.createdAt)
    //         console.log('SUBTRACT', date1- date2)
    //         return date2 - date1;
    //       });

        //   console.log('POSTS BY DATE', postsByDate)
    }

    componentDidMount(){
        this.props.fetchPosts()
        console.log(this.props.post)
    }

    render() {
        return (
            <View style={styles.view}>
                <RecursivePosts posts={posts} parentId={null} depth={0}/>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    view:{
        paddingTop: 10
    }
  });

mapStateToProps = state => ({
    posts: state.posts
})

  const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts())
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllPosts)
  

