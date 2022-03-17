import React from 'react'
import { useState, useEffect } from 'react'

import TrackCard from './TrackCard'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import userAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '7815c1f3863347b88bed977b67f40e0e',
})

export default function Mainboard({ code }) {
    const accessToken = userAuth(code)
    const [playlistId, setPlaylistId] = useState('')
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return

        async function getDiscoverWeeklyId() {
            spotifyApi
                .searchPlaylists('Discover Weekly')
                .then((res) => {
                    setPlaylistId(res.body.playlists.items[0].id)
                })
                .catch((err) => {
                    console.error(err)
                })
        }

        getDiscoverWeeklyId()
    }, [accessToken, playlistId])

    useEffect(() => {
        if (!playlistId) return
        if (!accessToken) return
        if (tracks.length > 0) return

        async function getDiscoverWeekly() {
            spotifyApi
                .getPlaylist(playlistId)
                .then((res) => {
                    setTracks(res.body.tracks.items)
                    console.log(res.body.tracks.items)
                })
                .catch((err) => {
                    console.error(err)
                })
        }

        getDiscoverWeekly()
    }, [accessToken, playlistId, tracks])

    return (
        <div>
            {tracks.map((track) => {
                return (
                    <TrackCard
                        key={track.track.id}
                        spotifyApi={spotifyApi}
                        trackId={track.track.id}
                    />
                )
            })}
        </div>
    )
}
