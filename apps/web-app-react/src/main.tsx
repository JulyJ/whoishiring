import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { relayStylePagination } from "@apollo/client/utilities";

const apiUrl = import.meta.env.VITE_JOBS_API_URL;

console.log("apiUrl", apiUrl);

if (!apiUrl) {
    throw new Error("VITE_JOBS_API_URL is not defined");
}

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    jobPostsPaginated: relayStylePagination((args: any) => {
                        return ["filter"];
                    }),
                },
            },
        },
    }),
    uri: apiUrl,
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
);
