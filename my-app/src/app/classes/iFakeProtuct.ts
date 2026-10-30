import { IFakeProductRating } from './IFakeProductRating';

export interface IFakeProduct {
    id:number,
    title:string, //nháy đôi là chuỗi
    price:number, //ko nháy đôi là số
    description:string,
    category:string,
    image:string,
    rating:IFakeProductRating
}