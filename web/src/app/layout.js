import './globals.css'

import Head from 'next/head'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <title>BC Flow</title>
        <link rel='icon' href='/bc-seal.png' />
        <meta name='description' content='BC Flow System' />
      </Head>
      <body>{children}</body>
    </html>
  )
}
