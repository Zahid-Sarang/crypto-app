import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key":"85c7da59d6mshf54ac2a8d989acap140f5bjsn2227b9478350",
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
        reducerPath: 'cryptoApi',
        baseQuery: fetchBaseQuery({baseUrl}),
        endpoints:(builder) => ({
            getCryptos:builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`), // endpoints fetch data from Api 
            })
        })
});


export const {
    useGetCryptosQuery,
} = cryptoApi;