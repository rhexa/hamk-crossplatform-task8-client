import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { getMovies } from '../models/Movies'

const MovieList = (props) => {
    return (
        <View style={{...props.style}}>
            <FlatList 
                data={props.movies}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.picture.path }}
                            style={styles.picture} />
                        <View style={styles.listRow}>
                            <View style={styles.texts}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.text}>{item.year}</Text>
                                <Text style={styles.text}>{item.director}</Text>
                            </View>
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={()=>props.update(item.id)}>
                                    <AntDesign name="edit" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>props.delete(item.id)}>
                                    <AntDesign name="delete" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )} />
        </View>
    )
}

export default MovieList

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#fff',
        width: 360,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: 12,
        borderRadius: 5,
        justifyContent: 'space-evenly'
    },
    listRow: {
        minHeight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    picture: {
        alignSelf: 'center',
        marginTop: 5,
        width: 200,
        height: 150,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    texts: {
        flex: 9,
        justifyContent: 'center'
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 16
    }
})
