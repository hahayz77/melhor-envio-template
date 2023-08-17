const fetchToken = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/", { method: 'GET'});

        if (!response.ok) {
            throw new Error('Request Token failed');
        }

        const data = await response.json();
        return data.access_token;
    } catch (err) {

    }
}

export default fetchToken;