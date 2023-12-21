import { useMutation } from "react-query"

export const useMutationHooks = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation
}