import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalMovie from './components/ModalMovie'
import MovieList from './components/MovieList'
import * as Repo from './models/Movies'
import uid from 'react-native-uuid'

export default function App() {
  const [movies, setmovies] = useState([])
  const [title, settitle] = useState()
  const [year, setyear] = useState()
  const [director, setdirector] = useState()
  const [modalAddMovie, setmodalAddMovie] = useState(false)
  const [modalUpdateMovie, setmodalUpdateMovie] = useState(false)
  const [image, setimage] = useState()
  const [isUploadImage, setisUploadImage] = useState(true)
  const [tmpImage, settmpImage] = useState()
  const uuid = () => uid.v4()
  const movieid = useRef()

  const reset = () => {
    settitle()
    setyear()
    setdirector()
    setimage()
    setmodalUpdateMovie(false)
  }

  const getMovies = async () => {
    const data = await Repo.getMovies()
    setmovies(data)
  }
  
  const addMovie = async () => {
    const mov = {
      title,
      year,
      director,
      picture: tmpImage
    }
    const data = await Repo.addMovie(mov)
    reset()
    setmodalAddMovie(false)
  }
  
  const updateMovie = async (id) => {
    const mov = {
      title,
      year,
      director,
      picture: tmpImage
    }
    console.log('tmpImage addMovie : '+JSON.stringify(tmpImage))
    const data = await Repo.updateMovie(id, mov)
    reset()
  }
  
  const deleteMovie = async (id) => {
    const data = await Repo.deleteMovie(id)
    reset()
  }

  const setFormAdd = () => {
    setmodalAddMovie(true)
  }

  const setFormUpdate = (id) => {
    const movie = movies.filter(m => m.id === id)[0]
    settitle(String(movie.title))
    setyear(String(movie.year))
    setdirector(String(movie.director))
    setimage(String(movie.picture.path))
    movieid.current = id
    setmodalUpdateMovie(true)
  }

  const uploadImage = async () => {
    const name = image.split('/').pop()
    const extension = name.split('.').pop()
    const picture = {
      uri: image,
      type: `image/${extension}`,
      name
    }

    try {
      const { data } = await Repo.uploadImage(picture)
      settmpImage({
        name: data.name,
        path: data.tempFilePath
      })      
    } catch (error) {
      console.log('error : '+error)
    }
  }
  
  useEffect(() => {
    getMovies()
    if (!isUploadImage) {
      if (image){
        uploadImage()
        setisUploadImage(true)
      } 
    }
  })
  
  return (
    <View style={{...styles.container, marginTop: 60, ...styles.bgPrimary}}>
      <View style={{width: 360, marginTop: 10}} ><Button title={'Add Movie'} onPress={setFormAdd} /></View>
      <MovieList movies={movies}
        style={{marginBottom: 10, ...styles.container}}
        update={setFormUpdate}
        delete={deleteMovie}
      />
      <ModalMovie visible={modalAddMovie} 
        title={'Add Movie'}
        titleOnChange={text=>settitle(text)}
        titleValue={title}
        yearOnChange={text=>setyear(text)}
        yearValue={year}
        directorOnChange={text=>setdirector(text)}
        directorValue={director}
        image={image}
        setImage={setimage}
        setisUploadImage={setisUploadImage}
        onPress={addMovie}
        onCancel={()=>setmodalAddMovie(false)}
      />
      <ModalMovie visible={modalUpdateMovie} 
        title={'Update Movie'}
        movieid={movieid.current}
        titleOnChange={text=>settitle(text)}
        titleValue={title}
        yearOnChange={text=>setyear(text)}
        yearValue={year}
        directorOnChange={text=>setdirector(text)}
        directorValue={director}
        image={image}
        setImage={setimage}
        setisUploadImage={setisUploadImage}
        onPress={updateMovie}
        onCancel={()=>reset()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  bgPrimary: {
    backgroundColor: "#9c9c9c"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
