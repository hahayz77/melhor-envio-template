import { useStateContext } from "@/context/StateContext";

const Loading = () => {

    const { loading } = useStateContext();

    return (
        <div className={`${loading === true ? "show_loading" : "hide_loading" } absolute bg-indigo-950/95 inset-0 grid place-items-center min-w-full min-h-full`}>
            <p className="animate-pulse">Loading...</p>
        </div>
    )
}

export default Loading