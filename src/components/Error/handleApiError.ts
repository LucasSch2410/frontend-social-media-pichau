import { toast } from "react-toastify";

export default function handleApiError(error: any, detail: string) {
    if (error.response) {
        toast.error(error.response.data.detail);
    } else {
        toast.error(detail);
        console.log(error)
    }
}