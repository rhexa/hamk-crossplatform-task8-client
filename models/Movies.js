import React from 'react'

const baseUrl = 'https://rhexa-stage-updates.herokuapp.com/api/movies'
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

export const getMovies = async () => {
    const options = { method: "GET" }
    try {
        const response = await fetch(baseUrl)
        const movies = await response.json()
        return movies
    } catch (error) {
        console.log(error)
    }
}

export const getMovieById = async (id) => {
    const options = { method: "GET" }
    let url = `${baseUrl}/${id}`
    try {
        const response = await fetch(url)
        const movie = await response.json()
        return movie
    } catch (error) {
        console.log(error)
    }
}

export const addMovie = async (movie) => {
    const options = { method: "POST", headers, body: JSON.stringify(movie) }
    let url = `${baseUrl}`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateMovie = async (id, movie) => {
    const options = { method: "PUT", headers, body: JSON.stringify(movie) }
    let url = `${baseUrl}/${id}`
    try {
        const response = await fetch(url, options)
        const movie = await response.json()
        return movie
    } catch (error) {
        console.log(error)
    }
}

export const deleteMovie = async (id) => {
    const options = { method: "DELETE" }
    let url = `${baseUrl}/${id}`
    try {
        const response = await fetch(url, options)
        const movie = await response.json()
        return movie
    } catch (error) {
        console.log(error)
    }
}

export const uploadImage = async (picture) => {
    let url = `${baseUrl}/uploadpicture`
    let form = new FormData()
    form.append('picture', picture)

    const options = {
      body: form,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    uploadImage
}