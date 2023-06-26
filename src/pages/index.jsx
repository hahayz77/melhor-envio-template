import { Inter } from 'next/font/google'
import FirstForm from '@/components/FirstForm';
import Loading from '@/components/Loading';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    return (
        <main>
            <h1>MelhorEnvio API Template</h1>
            <p>Enter your zip code below</p>
            <FirstForm />
            <Loading />
        </main>
    )
}
