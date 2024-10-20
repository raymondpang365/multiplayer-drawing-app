import Head from 'next/head'
import React from "react";

function SiteHead({
                  title = 'Drawing App By HKSEA x Raymond',
                desc = 'Drawing App By HKSEA x Raymond'
}) {
  return (
      <Head>
          <title> {title}</title>
          <link rel="icon" href="/cube_white.svg"/>
          <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'/>
          <meta charSet="utf-8"/>
          <meta name="author" content="Raymond Pang"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>

          {/* KEYWORDS */}
          <meta name="title" content={title}/>
          <meta
              name="description"
              content={desc}
          />
          <meta
              name="keywords"
              content="React, Drawing, Multiplayer, Canvas"
          />
          {/* THEMES */}
          <meta name="color-scheme" content="dark light"/>
          <meta name="theme-color" content="#F3EFE0" media="(prefers-color-scheme: light)"/>
          <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-title" content="Cats Realm"/>
          <meta name="application-name" content="Cats Realm"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          {/* ICONS */}
          <link rel="apple-touch-icon" sizes="180x180" href="/logo/cube180.png"/>
          <link rel="icon" href="/cube_white.svg"/>
          <link rel="icon" href="/cube_white.svg"/>
          <link rel="manifest" href="/manifest.json"/>
          {/* OG TAGS */}
          <meta property="og:type" content="website"/>
          <meta property="og:title" content={title}/>
          <meta
              property="og:description"
              content={desc}
          />
          <meta
              property="og:image"
              content="/cube_white.svg"
          />
      </Head>
  )
}

export default SiteHead
