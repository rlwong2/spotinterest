import React from 'react'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'

export default function TrackCard({ spotifyApi, trackId }) {
    const [trackName, setTrackName] = useState('')
    const [artistNames, setArtistNames] = useState('')
    const [albumArt, setAlbumArt] = useState('')

    useEffect(() => {
        if (!spotifyApi) return

        async function getTrack() {
            spotifyApi
                .getTrack(trackId)
                .then((res) => {
                    // set track name
                    setTrackName(res.body.name)
                    
                    // set artist names
                    let artistNamesTemp = ''
                    res.body.artists.forEach((artist) => {
                        if (artistNamesTemp.length > 0) {
                            artistNamesTemp += ', '
                        }
                        artistNamesTemp += artist.name;
                    })
                    setArtistNames(artistNamesTemp)

                    // set album art
                    setAlbumArt(res.body.album.images[1].url)
                    
                })
                .catch((err) => console.error(err))
        }

        getTrack()
    }, [artistNames, spotifyApi, trackId, trackName])

    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardHeader title={trackName} subheader={artistNames} />
            <CardMedia
                component="img"
                height="100%"
                width="auto"
                image={albumArt}
                alt="Paella dish"
            />
        </Card>
    )
}
