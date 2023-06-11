import { brandsDTO } from "../brands/brands.model";
import { categoryDTO } from "../category/category.model";
import { shopDTO } from "../shops/ShopForm.model";

export interface gameDTO{
    id:number;
    title: string;
    poster: string;//url
    inShops: boolean,
    description: string,
    releaseDate: Date,
    categories:categoryDTO[],
    shops:shopDTO[],
    brands:brandsDTO[],
    userVote:number,
    averageVote:number;
}

export interface gameCreationDTO{
    title: string,
    inShops: boolean,
    description: string,
    releaseDate? : Date,
    poster?: File,
    posterURL?: string,
    categoriesIds?:number[],
    shopsIds?:number[],
    brands?:brandsDTO[]
}

export interface landingPageDTO{
    inShops?: gameDTO[],
    upcomingReleases?: gameDTO[],
}


export interface gamesPostGetDTO{
    categories: categoryDTO[];
    shops: shopDTO[];
}

export interface gamePutGetDTO{
    game: gameDTO,
    selectedCategories: categoryDTO[],
    nonSelectedCategories: categoryDTO[],
    selectedShops: shopDTO[],
    nonSelectedShops: shopDTO[],
    brands: brandsDTO[]

}

