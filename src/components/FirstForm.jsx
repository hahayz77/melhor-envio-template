import { useStateContext } from '@/context/StateContext';
import CalculateShipping from '@/functions/CalculateShipping';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

export default function FirstForm() {

    const { setLoading } = useStateContext();
    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log(errors)

    const onSubmit = async data => {

        setLoading(true);
        if (data.zip_code.length < 9) return console.log("error")

        const response = await CalculateShipping(data.zip_code);
        if (response.error) {
            setLoading(false);
            return console.log(response.error);
        }
        else {
            console.log(response.data);
        }
        setLoading(false);
    }

    return (
        <form className='relative' onSubmit={handleSubmit(onSubmit)}>
            <InputMask className='input' mask="99999-999" maskChar="" placeholder="ZIP code" {...register("zip_code", {
                required: { value: true, message: "Zip code is Required!" },
                minLength: { value: 9, message: "Wrong zip code" }
            })} />
            <input className={`btn ${errors?.zip_code?.message ? "btn_error" : ""} `} type="submit" />
            {errors.zip_code &&
                <div className='h-fit my-3 absolute left-0 -bottom-12 w-full'>
                    <Alert status='error'>
                        <AlertIcon className='h-4 px-2 animate-pulse text-red-500/80' />
                        <AlertTitle>{errors?.zip_code?.message}</AlertTitle>
                    </Alert>
                </div>}
        </form>
    );
}
