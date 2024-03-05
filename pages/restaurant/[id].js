import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    useQuery,
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
} from '@apollo/client';
import { Dishes, Cart } from '../../src/components';

const DishList = ({ restaurantId }) => {
    // Define the GraphQL query for fetching dishes based on the restaurant ID
    const GET_DISHES = gql`
        query GetDishes($restaurantId: ID!) {
            dishes(where: { restaurant: { id: $restaurantId } }) {
                id
                name
            }
        }
    `;

    // Fetch the dishes using the Apollo useQuery hook
    const { loading, error, data } = useQuery(GET_DISHES, {
        variables: { restaurantId },
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading dishes</p>;
    }
    
    return (
        <div>
            <p>Dish list here</p>
            {/* Render your dishes here using data.dishes */}
        </div>
    );
};

function RestaurantDetails() {
    const router = useRouter();
    const { id } = router.query;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const link = new HttpLink({ uri: `${API_URL}/graphql` });
    const cache = new InMemoryCache();
    const client = new ApolloClient({ link, cache });
    const [searchTerm, setSearchTerm] = useState('');

    // Define the GraphQL query for fetching restaurant details
    const GET_RESTAURANT = gql`
        query GetRestaurant($id: ID!) {
            restaurant(id: $id) {
                id
                name
            }
        }
    `;

    // Fetch the restaurant details using the Apollo useQuery hook
    const { loading: restaurantLoading, error: restaurantError, data: restaurantData } = useQuery(GET_RESTAURANT, {
        variables: { id },
    });

    if (restaurantLoading) {
        return <p>Loading...</p>;
    }

    if (restaurantError) {
        return <p>Error loading restaurant details</p>;
    }

    const restaurantName = restaurantData.restaurant.name;

    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Restaurant Details</h1>
                <h2>Restaurant Name: {restaurantName}</h2>

                {/* Search bar */}
                <input
                    type="text"
                    className="dish-search"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Display all dishes */}
                <DishList restaurantId={id} searchTerm={searchTerm} />

                <Cart />
            </div>
        </ApolloProvider>
    );
}

export default RestaurantDetails;
