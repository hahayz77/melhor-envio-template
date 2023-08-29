
const CalculateShipping = async (postalCode, accessToken) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipment/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                zip_code: postalCode,
                access_token: accessToken ? accessToken : null
            })
        });

        if (!response.ok) throw new Error(response.statusText)

        const data = await response.json();
        if (data[0]?.error || data.error) {
            throw new Error(data[0]?.error || data.error);
        }
        if (data.access_token) {
            return { data: data.data, access_token: data.access_token }
        } else {
            return data;
        }

    } catch (err) {
        return { error: err.message };
    }
}

export default CalculateShipping;