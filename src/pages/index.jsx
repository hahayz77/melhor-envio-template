import { Inter } from 'next/font/google'
import { useStateContext } from "../context/StateContext";
import FirstForm from '@/components/FirstForm';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { isAlive } = useStateContext();

    return (
        <main>
            <h1>Hello World!</h1>
            <p>{isAlive}</p>
            <FirstForm />
        </main>
    )
}
