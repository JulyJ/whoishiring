import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000/",
    documents: ["./src/**/*.tsx"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            // plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    // ignoreNoDocuments: true,
};

export default config;
