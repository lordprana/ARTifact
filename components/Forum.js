import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';


class Forum extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
    }
    render(){
        return(
            <View style = {{padding: 10}}>
                <TextInput
                style={{height: 40}}
                placeholder = "Join the Conversation!"
                onChangeText = {(text) => this.setState({text})}
                />
                <Button
                raised
                title = 'Hit It'
                color="#841584"
                />
            </View>
            
        )
    }
}

// var styles = StyleSheet.create({
//     button: {
//     textAlign: 'center',
//     color: '#ffffff',
//     marginBottom: 7,
//     border: 2,
//     borderRadius: 1
//   }
// })


export default Forum;