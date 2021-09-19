import React from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Entypo } from '@expo/vector-icons'

const ModalMovie = (props) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.cancelled) {
            props.setImage(result.uri)
            props.setisUploadImage(false)
        }
      }

    return (
        <Modal visible={props.visible}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <View style={styles.forms}>
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        {props.image ? <Image source={{ uri: props.image }} style={{ width: 200, height: 200 }} /> : <Entypo name="image" size={100} color="black" />}
                        <View style={{marginTop: 10}}><Button title="Pick an image from camera roll" onPress={pickImage} /></View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.formText}>Title</Text>
                        <TextInput style={styles.formTextInput} onChangeText={props.titleOnChange} value={props.titleValue} />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.formText}>Year</Text>
                        <TextInput style={styles.formTextInput} onChangeText={props.yearOnChange} value={props.yearValue} />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.formText}>Director</Text>
                        <TextInput style={styles.formTextInput} onChangeText={props.directorOnChange} value={props.directorValue} />
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.button}><Button color={'#38c75e'} title={props.title} onPress={()=>props.onPress(props.movieid)} /></View>
                        <View style={styles.button}><Button color={'tomato'} title={'Cancel'} onPress={props.onCancel} /></View>
                    </View>
                </View>
            </ScrollView>

        </Modal>
    )
}

export default ModalMovie

const styles = StyleSheet.create({
    forms: {
        marginTop: 50,
        width: 360
    },
    form: {
        marginTop: 10,
        borderWidth: 2,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formText: {
        flex: 3,
        fontSize: 16,
        fontWeight: '800'
    },
    formTextInput: {
        flex: 7,
        fontSize: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    button: {
        width: 150
    }
})
