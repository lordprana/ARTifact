import React from 'react';
import { Button, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {addPost} from '../store';
import {connect} from 'react-redux';

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        if (props.user && props.piece) {
            this.state = {
                content: '',
                userId: props.user.id,
                pieceId: props.piece.id
            };
        } else {
            this.state = {
                content: ''
            };
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(userId, pieceId){
        this.props.addPost(this.state);
        this.setState({content: ''});
    }
    render(){
        return (
            <View style={styles.view}>
                <View style={styles.content}>
                    <TextInput
                        placeholder="Join the Conversation..."
                        value={this.state.content}
                        multiline={true}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        onChangeText={(content) => this.setState({ content })}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.handleSubmit()}>
                        <View style={styles.addPostButton}>
                            <Text style={{color: 'white'}}>Add Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        paddingLeft: 8,
        borderColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 8
    },
    addPostButton: {
        backgroundColor: '#4286f4',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20

    }
});

const mapState = state => ({
    user: state.user,
    piece: state.piece
});

const mapDispatch = (dispatch) => ({
    addPost: (post) =>
        dispatch(addPost(post))
});

export default connect(mapState, mapDispatch)(CreatePost);
