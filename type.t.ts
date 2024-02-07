export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    amountDrinks: number;
    amountSushi: number;
    amountWings: number;
    category: string;
    container:number;
    priceTotal:number;
    isMedium?:boolean;
}

export interface Categories {
    id: number;
    name: string;
    image: string;
}

export interface SelectedProducts {
    productId: number;
    amount: number;
}

export interface ProductSelected {
    productId: number;
    amount: number;
    isMedium?:boolean;
    summary: SummaryProduct;
}

export interface SummaryProduct {
    [key: string]: SelectedProducts[];
}