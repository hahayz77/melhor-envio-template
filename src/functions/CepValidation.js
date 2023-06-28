const CepValidation = async (postalCode) => {
    try {
        const cepTestUrl = `https://viacep.com.br/ws/${postalCode}/json/`;

        const response = await fetch(cepTestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();
        return data;
    } catch (erro) {
        return erro;
    }
}

export default CepValidation;