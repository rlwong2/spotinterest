import React from 'react'
import Button from '@mui/material/Button'
import userAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: "7815c1f3863347b88bed977b67f40e0e"
})

export default function Mainboard({ code }) {
    const accessToken = userAuth(code)
    return <Button variant="contained">Get User's Playlists</Button>
}
