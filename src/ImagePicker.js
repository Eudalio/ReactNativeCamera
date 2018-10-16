import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
} from 'react-native';

import imagePicker from 'react-native-image-picker';

export default class ImagePicker extends Component {
    state = {
        ImageSource = null,
    }

    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        imagePicker.showImagePicker(options, (response) => {
            console.log("Response: ", response);
            if(response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    ImageSource: source
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped()}>
                    <View style={styles.ImageContainer}>
                        { this.state.ImageSource === null 
                            ? <Text>Select a Photo</Text>
                            : <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1'
    },
    ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
    }
})