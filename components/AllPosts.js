import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView } from 'react-native';
import { fetchPosts } from '../store/posts'
import RecursivePosts from './RecursivePosts';

class AllPosts extends React.Component {
    constructor(props) {
        super(props)
        //console.log(posts);
       const postsByDate= posts.sort(function(a,b){
           const date1 = new Date(a.createdAt)
           const date2 = new Date(b.createdAt)
            console.log('SUBTRACT', date1- date2)
            return date2 - date1;
          });

          console.log('POSTS BY DATE', postsByDate)
    }

    // componentDidMount(){
    //     this.props.fetchPosts()
    // }

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


export default AllPosts;


const posts = [
    {
        "subjectLine": "Leonard is Totally Amazing!",
        "content": "This piece is an excellent example of Leonard's masterful control over composition, and her incredible eye for color",
        "votes": 4,
        "pieceId": 2,
        "userId": 3,
        "parentId": null,
        "id": 1,
        'createdAt': '2018-03-23 11:41:18.5-04'
    },
    {
        "subjectLine": null,
        "content": " I love the attention to detail, her ability to see narrative in urban life is an inspiration to us all.",
        "votes": 10,
        "pieceId": 2,
        "userId": 5,
        "parentId": 1,
        "id": 2,
        'createdAt': '2018-03-23 11:43:18.5-04'
    },
    {
        "subjectLine": null,
        "content": "One of the most underappreciated artists of her time!  Leonard shows us time and time again that beauty is in the eye of the beholder. This piece is an excellent example of how she can propose fascinating questions about human nature and create compelling narratives through a single photograph.",
        "votes": 12,
        "pieceId": 2,
        "userId": 2,
        "parentId": 1,
        "id": 3,
        'createdAt': '2018-03-23 11:42:18.5-04'
    },
    {
        "subjectLine": null,
        "content": "I completely agree. What an insightful comment! I really think that Leonard's approach deals with the issue of voyeurism with incredible tact and mastery. Her carefully constructed perspective makes me feel like I am there in the scene with these people. Simply magical!",
        "votes": 8,
        "pieceId": 2,
        "userId": 3,
        "parentId": 2,
        "id": 4,
        'createdAt': '2018-03-23 11:44:18.5-04'
    },
    {
        "subjectLine": null,
        "content": "bleak but powerful, Leonard embodies what it means to be a modern photographer",
        "votes": 6,
        "pieceId": 2,
        "userId": 2,
        "parentId": 2,
        "id": 5,
        'createdAt': '2018-03-23 11:47:18.5-04'
    }
]

const pieces = [
    {
      "Piece name": "Sea Fan",
      "Year created": 1980,
      "Artist Name": "Lesley Schiff",
      "Birth Year": 1951,
      "Death Year": ""
    },
    {
      "Piece name": "Leopards",
      "Year created": 1981,
      "Artist Name": "Lesley Schiff",
      "Birth Year": 1951,
      "Death Year": ""
    },
    {
      "Piece name": "Toy Snake",
      "Year created": 1981,
      "Artist Name": "Lesley Schiff",
      "Birth Year": 1951,
      "Death Year": ""
    }]

const users = [
    {
        "userName": "Robby Rins",
        "email": "RobTheHustler@gmail.com"
    },
    {
        "userName": "Matteo",
        "email": "GabaCity@gmail.com"
    },
    {
        "userName": "Elly B",
    "email": "ellyB@gmail.com"
    },
    {
        "userName": "Romainnn",
        "email": "blah@gmail.com"
    },
    {
        "userName": "Big Man Marko",
        "email": "marko@gmail.com"
    }
]