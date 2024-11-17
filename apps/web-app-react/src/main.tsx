import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { relayStylePagination } from "@apollo/client/utilities";

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
    uri: "http://localhost:4000/",
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
);
