import React from 'react';
import { StyleSheet, FlatList, Button, Text, View, TextInput, ScrollView } from 'react-native';
import { fetchPosts } from '../store/posts'

class AllPosts extends React.Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount(){
    //     this.props.fetchPosts()
    // }

    render() {
        return (
            <View style={styles.view}>
                    <FlatList
                        data={posts}
                        renderItem={({ item }) =>
                            <Text style={styles.text}>
                                <Text style={ styles.subjectLine }>{item.subjectLine + `\n`}</Text>
                                <Text>{item.votes}</Text>
                                <Text>{`\n` + item.content}</Text>
                            </Text>
                        }
                    />
            </View>
        )
    }
}



const styles = StyleSheet.create({
    view:{
        paddingTop: 10
    },
    subjectLine: {
        fontSize: 16,
        fontFamily: "Georgia",
    },
    text: {
        fontSize:14,
        fontFamily: "Georgia",
        marginLeft: 6
    },
    votes: {
        backgroundColor: 'red',
        fontSize: 15
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
        "parentId": null
    },
    {
        "subjectLine": null,
        "content": " I love the attention to detail, her ability to see narrative in urban life is an inspiration to us all.",
        "votes": 10,
        "pieceId": 2,
        "userId": 5,
        "parentId": 1
    },
    {
        "subjectLine": null,
        "content": "One of the most underappreciated artists of her time!  Leonard shows us time and time again that beauty is in the eye of the beholder. This piece is an excellent example of how she can propose fascinating questions about human nature and create compelling narratives through a single photograph.",
        "votes": 12,
        "pieceId": 2,
        "userId": 2,
        "parentId": 1
    },
    {
        "subjectLine": null,
        "content": "I completely agree. What an insightful comment! I really think that Leonard's approach deals with the issue of voyeurism with incredible tact and mastery. Her carefully constructed perspective makes me feel like I am there in the scene with these people. Simply magical!",
        "votes": 8,
        "pieceId": 2,
        "userId": 3,
        "parentId": 2
    },
    {
        "subjectLine": null,
        "content": "bleak but powerful, Leonard embodies what it means to be a modern photographer",
        "votes": 6,
        "pieceId": 2,
        "userId": 2,
        "parentId": 4
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