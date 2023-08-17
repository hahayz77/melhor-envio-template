import { useRouter } from 'next/router';
import { parse } from 'querystring';
import { serialize } from 'cookie';


const MelhorEnvioCallBack = () => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        // Get the 'code' query parameter from the URL
        const { code } = parse(window.location.search.replace('?', ''));

        // Save the 'code' value as a cookie
        document.cookie = serialize('code', code, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // Cookie expiration time in seconds (e.g., 1 hour) => sec, min, h, days
        });

        // Redirect to another page or perform any other actions as needed
        // For example, redirect to a success page:
        // router.push('/');
    }

    return null; // or a loading indicator if you want
}

export default MelhorEnvioCallBack