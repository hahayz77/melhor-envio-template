const fetchToken = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/`, { method: 'GET'});

        if (!response.ok) {
            throw new Error('Request Token failed');
        }

        const data = await response.json();
        return data.access_token;
    } catch (err) {

    }
}

export default fetchToken;