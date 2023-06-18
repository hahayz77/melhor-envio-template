import '@/styles/globals.css'
import { StateContext } from '@/context/StateContext'

export default function App({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <div className='min-h-full min-w-full absolute opacity-30 backdrop-blur-3xl bg-blend-darken bg-black -z-10 inset-0'/>
        <Component {...pageProps} />
      </StateContext>
    </>
  )
}
