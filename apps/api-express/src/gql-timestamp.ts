import { GraphQLScalarType, Kind } from "graphql";

export const UnixTimestamp = new GraphQLScalarType({
    name: "UnixTimestamp",
    description: "Unix timestamp in seconds",

    serialize(value) {
        if (value instanceof Date) {
            return Math.floor(value.getTime());
        }
        return value;
    },

    parseValue(value) {
        if (typeof value === "string") {
            value = parseInt(value, 10);
        }

        return value;
    },

    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10) * 1000);
        }
        return null;
    },
});
