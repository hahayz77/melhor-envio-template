import { Inter } from 'next/font/google'
import { useStateContext } from "../context/StateContext";
import FirstForm from '@/components/FirstForm';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { isAlive } = useStateContext();

    return (
        <main>
            <h1>MelhorEnvio API Template</h1>
            <p>Enter your zip code below</p>
            <FirstForm />
        </main>
    )
}
