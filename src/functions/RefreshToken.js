const RefreshToken = async () => {
    console.log("RefreshToken -----------------")
    try {
        const response = await fetch('/api/token', { method: 'POST'});

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        
        console.log("----------")
        console.log(data);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default RefreshToken;
