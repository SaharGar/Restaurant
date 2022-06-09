export interface LandingPageState {
    isLandingPageOn: boolean
    restaurantName?: string;
    owner?: RestaurantOwner;
}

export interface RestaurantOwner {
    name?: string;
    imageUrl?: string
}

export interface FetchPeople {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    }
    results: People[]
}

export interface People {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    }
    location: {
        name: string;
        url: string;
    }
    image: string;
    episodes: string[];
    url: string;
    created: string;
}