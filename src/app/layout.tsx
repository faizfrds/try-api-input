import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

async function getTime(): Promise<Time>{ //function to return time

  const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Jakarta", 
  {
    next: { //refreshes every 4 seconds
      revalidate: 2,
    }
  }
  );
  return res.json();
}

type Time = {
  datetime: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const res = await getTime();

  return (
    <html lang="en">
      <body className={inter.className}>
        <h2>{res.datetime}</h2>
        {children}
      </body>
    </html>
  )
}
