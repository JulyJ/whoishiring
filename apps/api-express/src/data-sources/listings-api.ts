import { RESTDataSource } from "npm:@apollo/datasource-rest";
import { Listing } from "../types.ts";

export class ListingsAPI extends RESTDataSource {
    override baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    getFeaturedListings() {
        return this.get<Listing[]>("featured-listings");
    }
}
