import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from "notistack"
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <CssBaseline />
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
    >
      <AppBar position="relative" variant="outlined" color="transparent">
        <Container maxWidth="md">
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NetUnion 招新
            </Typography>
            <Button href="/" color="inherit">提交</Button>
            <Button href="/query" color="inherit">查询</Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Component {...pageProps} />
    </SnackbarProvider>
  </>
}

export default MyApp
