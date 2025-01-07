import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://192.168.50.249:4001/",
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
