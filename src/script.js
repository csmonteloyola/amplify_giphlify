import Amplify, {API, graphqlOperation} from "@aws-amplify/api"

import awsConfig from './aws-exports'
import {createGif} from './graphql/mutations'
import {listGifs} from './graphql/queries'

Amplify.configure(awsConfig)


const createNewGif = async (e) => {
    e.preventDefault()

    const gif = {
        altText: document.getElementById('altText').value,
        url: document.getElementById('url').value
    }


    try {
        const newGif = await API.graphql(graphqlOperation(createGif, 
            {input: gif}))
        const img = document.createElement('img')
        img.setAttribute('src', gif.url)
        img.setAttribute('altText', altText)
        document.querySelector('.container').appendChild(img)
        document.getElementById('create-form').reset()
    } catch (error) {
        console.log(error)
    } 
    
}

const getGifs = async () => {
    const container = document.querySelector('.container')
    const gifs = await API.graphql(graphqlOperation(listGifs))
    gifs.data.listGifs.items.map(gif => {
        const img = document.createElement('img')
        img.setAttribute('src', gif.url)
        img.setAttribute('altText', altText)
        container.appendChild(img)
    })
}
getGifs()

document.getElementById('create-form').addEventListener('submit', createNewGif)