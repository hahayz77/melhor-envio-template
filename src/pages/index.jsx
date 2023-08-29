import FirstForm from '@/components/FirstForm';
import Loading from '@/components/Loading';
import fetchToken from '@/functions/FetchToken';
import { useStateContext } from '@/context/StateContext';
import { useEffect } from 'react';
import { parse, serialize } from 'cookie';

export default function Home({ accessToken }) {

    const { setTokenMelhorEnvio } = useStateContext();
    useEffect(() => {

        setTokenMelhorEnvio(accessToken);
    }, [])

    return (
        <main>
            <h1>MelhorEnvio API Template</h1>
            <p>Enter your zip code below</p>
            <FirstForm />
            <Loading />
        </main>
    )
}

export async function getServerSideProps(context) {

    // Check if there's a cookie in the request headers
    const cookies = parse(context.req.headers.cookie || null); // Parse cookies from headers
    let accessToken = cookies.accessToken;

    if (!accessToken) {
        accessToken = await fetchToken();
        
        // Set the accessToken cookie
        context.res.setHeader('Set-Cookie', serialize('accessToken', accessToken, {
            maxAge: 60 * 60 * 24 * 30, // Cookie expiration in seconds (e.g., 1 hour)
        }));
    }

    return {
        props: { accessToken }
    }
}
