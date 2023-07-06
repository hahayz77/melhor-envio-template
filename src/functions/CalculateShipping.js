import CepValidation from "./CepValidation";

const CalculateShipping = async (postalCode) => {
    try {
        // -------- CEP|POSTALCODE|ZIPCODE VALIDATION
        const cepValidation = await CepValidation(postalCode);
        if (cepValidation.erro) throw new Error("Zipcode not found...")

        // -------- MELHOR ENVIO FETCH 
        const fromPostalCode = "54270-070"; // -------- MELHOR FROM POSTAL CALCULATION
        const apiUrl = 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate';
        //verificar token salvo no cookie
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhhMDRkMTVmOTU3OTIxNTEyMDJhNThkM2Y1YmZlYmI2NDYzZmM1MTliNGU3Y2RjNWM3MDIxYWQ1ODFlMGE4M2UwZmVjMWYzMjU1M2E2ZGY3In0.eyJhdWQiOiIzODU0IiwianRpIjoiOGEwNGQxNWY5NTc5MjE1MTIwMmE1OGQzZjViZmViYjY0NjNmYzUxOWI0ZTdjZGM1YzcwMjFhZDU4MWUwYTgzZTBmZWMxZjMyNTUzYTZkZjciLCJpYXQiOjE2ODU1Mzk5MzYsIm5iZiI6MTY4NTUzOTkzNiwiZXhwIjoxNjg4MTMxOTM2LCJzdWIiOiIzMDk3MTQ3Mi0wZWMwLTQ4YzgtYWMyNi0wNjMwZjQ4ZWVmODEiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIl19.n_ZZRgCCWd4kdqzCz2Sqjt4clMlglxGuuli7zRG3IpoC10frhlojKwmseTRb9S9kBboSdT0OiEVDTxViTp2_YL8b-N5bD4f5iSIXRoiDrcW-SoKsLgNNvPkZX1bB1uSPfuRuvHk_U4qvOzTWPYgH0gQxyXom49PSntZ_cclaA9sIgn2zgzvBqP_Qnr5k5e-tP6XMb01iIzRc2-71BZ98WhCq3Q02y2kWRX9zWr4We5HEY6TSsRAHoDR3u6I-kZogWFBanTBwZt4zn_PcAZOeDY5kkX_KaUnhqDwSxqgYKZQCMbBdTzSrtIFN8QzL9k4dwdVK99imkeSeL7Y6T4lhljv8bltWKhunHGC526bS3Tdv45aya9gYihtQli5_8LWt6U2xAFemQT0dsRGSgRDgDmYl6_J2F-XRksyuzFQfSah6PC9ljFHxrlR2rEA2kGr9TXhJqQiB7XK35kPvrxCHQSV_Ew5D0IGh7neGokNGx4XvtEtT3ahd9L0mTFV3bbzuefXou3UaiptFUQKa7z_j0UYoZBQaFzZymXOhLTrOknWsqtSqNyYrOL0_BTehKU0WfolV27LGzBnu2EJp4oEQNtxX6rzdSKWleU42UvpXOzZZlFu6c0e3GbPxWqVA1vidSc8DwWPJ4_aoi6quko2P4ZqGSksNnQyniLqB8Q3NbFk"
        //se não existir... enviar solicitação para novo token
        // salvar no cookie

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Aplicação'
            },
            body: JSON.stringify(
                {
                    from: {
                        postal_code: fromPostalCode
                    },
                    to: {
                        postal_code: postalCode
                    },
                    package: {
                        height: 4,
                        width: 12,
                        length: 17,
                        weight: 0.3
                    },
                    options: {
                        insurance_value: 1180.87,
                        receipt: false,
                        own_hand: false
                    },
                    services: "1,2,3,4,7,11"
                }
            )
        });

        if (!response.ok) throw new Error('Request failed')

        const data = await response.json();
        if (data[0].error) throw new Error(data[0].error)

        return { data, cepValidation };
    } catch (err) {
        return { error: err.message };
    }
}

export default CalculateShipping;