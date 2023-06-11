import { gameCreationDTO } from "../Games/games.model";
import { brandCreationDTO } from "../brands/brands.model";

export function convertBrandToFormData(brand: brandCreationDTO): FormData{
    
    const formData = new FormData();

    formData.append('name', brand.name);

    if(brand.description){
        formData.append('description', brand.description);
    }

    if(brand.dateOfRelease){
        formData.append('dateOfRelease', formatDate(brand.dateOfRelease))
    }

    if(brand.picture){
        formData.append('picture', brand.picture);
    }


    return formData;

}

export function convertGameToFormData(game: gameCreationDTO){
    const formData = new FormData();

    formData.append('title', game.title);

    formData.append('description', game.description);

    formData.append('inShops', String(game.inShops));

    if(game.releaseDate){
        formData.append('releaseDate', formatDate(game.releaseDate));
    }

    if(game.poster){
        formData.append('poster', game.poster);
    }

    formData.append('categoriesIds', JSON.stringify(game.categoriesIds));
    formData.append('shopsIds', JSON.stringify(game.shopsIds));
    formData.append('brands', JSON.stringify(game.brands));


    return formData;
}

function formatDate(date:Date){
    date = new Date(date);

    const format = new Intl.DateTimeFormat("en",{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;

}