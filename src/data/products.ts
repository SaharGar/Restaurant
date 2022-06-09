import {Product} from "../models/general.models";
import {
    parmesanCheese,
    friedFish,
    frenchFries,
    spaghetti,
    basil,
    bun,
    tomato,
    onion,
    pickles,
    lettuce,
    meat,
    chicken,
    dough,
    mozzarellaCheese,
    tomatoSauce,
    cucumber,
    carrot,
    redBellPaper, pastaSheets,
} from "../data/materials";

export const products: Product[] = [
    {
        name: 'Hamburger',
        materials: [bun, tomato, onion, pickles, lettuce, meat],
        imgUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
        price: 65
    },
    {
        name: 'Pizza Margherita',
        materials: [dough, mozzarellaCheese, tomatoSauce],
        imgUrl: 'https://cdna.wobily.com/images/b27b6bef-ab5c-4b58-8914-0245a136624d_500.jpg',
        price: 50
    },
    {
        name: 'Chicken Salad',
        materials: [chicken, tomato, lettuce, onion, cucumber, carrot, redBellPaper],
        imgUrl: 'https://cpr.heart.org/-/media/AHA/Recipe/Recipe-Images/Mediterranean-Salad.jpg?h=636&iar=0&mw=890&w=890&hash=7CFBC1AF5742A79DB42AFCFB4B6FA43D',
        price: 30
    },
    {
        name: 'Spaghetti Bolognese',
        materials: [meat, tomato, onion, basil, spaghetti],
        imgUrl: 'https://bakeplaysmile.com/wp-content/uploads/2021/08/Spaghetti-Bolognese-Final-6-1.jpg',
        price: 45
    },
    {
        name: 'Fish & Chips',
        materials: [friedFish, frenchFries],
        imgUrl: 'https://www.thespruceeats.com/thmb/-Hq2aVGdlH43SB1R-A7UK2dCb6k=/1500x844/smart/filters:no_upscale()/best-fish-and-chips-recipe-434856-Hero-5b61b89346e0fb00500f2141.jpg',
        price: 50
    },

    {
        name: 'Lasagne',
        materials: [pastaSheets, tomatoSauce, meat, parmesanCheese],
        imgUrl: 'https://img.taste.com.au/N5uOwvqw/taste/2021/03/sweet-potato-and-lentil-lasagne-170423-2.jpg',
        price: 52
    }
]

