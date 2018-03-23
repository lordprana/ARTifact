import React from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import {addPost} from '../store'
import {connect} from 'react-redux'

class CreatePost extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            subjectLine: '',
            content: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        const { addPost } = this.props
        addPost(this.state)
    }
    render(){
        return(
            <View style = {styles.view}>
            <View style = {styles.header}>
            <Text style={{fontFamily: 'Georgia',
        fontSize: 30,}}>
        Make A Post</Text>
        </View>
            <View style={styles.subject}>
                <TextInput
                style = {{height: 12}}
                placeholder = 'Subject Line'
                onChangeText = {(subjectLine) => this.setState({subjectLine})}
                />
                </View>
                <View style={styles.space}/>
                <View style={styles.content}>
                <TextInput
                style={{height: 80}}
                placeholder = "Join the Conversation"
                multiline = {true}
                onChangeText = {(content) => this.setState({content})}
                />
                </View>
                <View>
                <Button
                raised
                title = 'Hit It'
                color= "#841584"
                onPress = {() => this.handleSubmit()}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 50
    },
    header: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    subject: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 2,
        paddingLeft: 8,
        borderColor: 'black',
        marginLeft: 20,
        marginRight: 20
    },
    space: {
        paddingTop: 10
    },
    content: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 2,
        paddingLeft: 8,
        borderColor: 'black',
        marginLeft: 20,
        marginRight: 20
    }
})


const mapDispatch = (dispatch, ownProps) => ({
    addPost: (post) => 
        dispatch(addPost(post))
})

export default connect(null, mapDispatch)(CreatePost)