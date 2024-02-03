import { TailSpin } from "react-loader-spinner"

export const PageLoading = () => {
    return (
        <div className="bg-zinc-950 w-screen h-screen flex justify-center items-center">
            <TailSpin color="#fff" width={200} height={200}/>
        </div>
    )
}