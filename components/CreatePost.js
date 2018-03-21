import React from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import {addPost} from '../store'


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
                
                <TextInput
                style = {{height: 15}}
                placeholder = 'Subject Line'
                onChangeText = {(subjectLine) => this.setState({subjectLine})}
                />
                <TextInput
                style={{height: 80}}
                placeholder = "Join the Conversation"
                multiline = {true}
                onChangeText = {(content) => this.setState({content})}
                />
                <Button
                raised
                title = 'Hit It'
                color= "#841584"
                onPress = {() => this.handleSubmit()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 20
    }
})

// mapState = null

// const mapDispatch = (dispatch, ownProps) => ({
//     addPost: (post) => 
//         dispatch(addPost(post))
// })

export default CreatePost;