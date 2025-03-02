import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5001/api"
});

type ErrorResponse = string | { title: string } | { errors?: Record<string, string[]> };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object
) => {
    api.dispatch(startLoading());
    await sleep();

    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());

    if (result.error) {
        console.log(result.error);

        const originalStatus =
            result.error.status === "PARSING_ERROR" && result.error.originalStatus
                ? result.error.originalStatus
                : result.error.status;

        const responseData = result.error.data as ErrorResponse;

        switch (originalStatus) {
            case 400:
                if (typeof responseData === "string") toast.error(responseData);
                else if (responseData.errors) {
                    toast.error(Object.values(responseData.errors).flat().join(", "));
                } else if (responseData.title) {
                    toast.error(responseData.title);
                }
                break;
            case 401:
                if (typeof responseData === "object" && "title" in responseData) {
                    toast.error(responseData.title);
                }
                break;
            case 404:
                router.navigate("/not-found");
                break;
            case 500:
                router.navigate("/server-error", { state: { error: responseData } });
                break;
            default:
                toast.error("Something went wrong");
                break;
        }
    }

    return result;
};
