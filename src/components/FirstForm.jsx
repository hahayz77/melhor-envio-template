import { useStateContext } from '@/context/StateContext';
import CalculateShipping from '@/functions/CalculateShipping';
import { Alert, AlertIcon, AlertTitle, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

export default function FirstForm() {

    const { setLoading, tokenMelhorEnvio } = useStateContext();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [outsideError, setOutsideError] = useState("");
    const [response, setResponse] = useState(null);
    const [selectValue, setSelectValue] = useState(null);
    const router = useRouter();
    // console.log(errors)

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
            if (response.error) throw new Error;
            else { //if it's all good
                setResponse(response);
                setOutsideError(null)
            }
            setLoading(false);
        } catch (err) {
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
                        <> {!e.error && <option key={index} value={JSON.stringify(e)}>{` R$ ${e.price?.replace(".",",")} - ${e.delivery_time} days to delivery - ${e.name}`}</option>} </>
                    ))}
                </Select>
            }
        </form>
    );
}
