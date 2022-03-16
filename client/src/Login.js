import React from 'react'
import Button from '@mui/material/Button'

const AUTH_URL =
    'https://accounts.spotify.com/authorize?client_id=7815c1f3863347b88bed977b67f40e0e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export default function Login() {
    return (
        <Button variant="contained" href={AUTH_URL}>
            Login
        </Button>
    )
}
