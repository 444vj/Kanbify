import React from 'react'
import { Stack, CircularProgress } from '@mui/material'

const AppLoader = () => {
  return (
    <Stack mt={45} alignItems="center">
        <CircularProgress />
    </Stack>
  )
}

export default AppLoader