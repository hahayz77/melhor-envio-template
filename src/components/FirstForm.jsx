import { useStateContext } from '@/context/StateContext';
import CalculateShipping from '@/functions/CalculateShipping';
import fetchToken from '@/functions/FetchToken';
import { Alert, AlertIcon, AlertTitle, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Cookies from 'js-cookie';

export default function FirstForm() {

    const { setLoading, tokenMelhorEnvio, setTokenMelhorEnvio } = useStateContext();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [outsideError, setOutsideError] = useState("");
    const [response, setResponse] = useState(null);
    const [selectValue, setSelectValue] = useState(null);
    const router = useRouter();

    const onSubmit = async data => {
        try {
            setLoading(true);
            setResponse(null);
            setOutsideError(null);

            if (data.zip_code.length < 9) {
                setLoading(false);
                return console.log("error")
            }

            const response = await CalculateShipping(data.zip_code, tokenMelhorEnvio);
            if (response.error) {
                setOutsideError(typeof response.error === "object" ? JSON.stringify(response.error) : response.error)
                Cookies.remove('accessToken');
                throw new Error(typeof response.error === "object" ? JSON.stringify(response.error) : response.error)
            }
            if (response.access_token) {
                setTokenMelhorEnvio(response.access_token);
                Cookies.set('accessToken', response.access_token, { expires: 30 });
            }
            setOutsideError(null);
            setResponse(response.data || response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const selectHandler = (e) => {
        if (e.target.value) {
            console.log(JSON.parse(e.target.value))
        }
    }

    return (
        <form className='relative' onSubmit={handleSubmit(onSubmit)}>
            <InputMask className='input' mask="99999-999" maskChar="" placeholder="ZIP code" {...register("zip_code", {
                required: { value: true, message: "Zip code is Required!" },
                minLength: { value: 9, message: "Wrong zip code" }
            })} />
            <input className={`btn ${errors?.zip_code?.message ? "btn_error" : ""} `} type="submit" value={`Calculate Shipment`} />
            {errors.zip_code &&
                <div className='h-fit my-3 absolute left-0 -bottom-12 w-full'>
                    <Alert status='error'>
                        <AlertIcon className='h-4 px-2 animate-pulse text-red-500/80' />
                        <AlertTitle>{errors?.zip_code?.message}</AlertTitle>
                    </Alert>
                </div>}
            {outsideError && <>
                <p className='text-center'>{outsideError}</p>
            </>}
            {response &&
                <Select className='select' placeholder='Select option' onChange={selectHandler}>
                    {response.map((e, index) => (
                        <> {!e.error && <option key={index} value={JSON.stringify(e)}>{` R$ ${e.price?.replace(".", ",")} - ${e.delivery_time} days to delivery - ${e.name}`}</option>} </>
                    ))}
                </Select>
            }
        </form>
    );
}
