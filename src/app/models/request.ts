export interface ProductFilterRequest {
    search?: string;
    startDate: string;
    endDate: string;
    rooms: number;
    adults: number;
    children: number;
    value: number;
    type: string;
    productSort?: ProductSortRequest
    optionFilter?: OptionFilterRequest
}
export interface ProductSortRequest {
    direction: string;
    property: string
}
export interface SaveFavoriteHotelRequest {
    hotelId: number;
    username: string;
}

type Nullable<T> = T | null;
export interface AddToCartRequest {
    adult: number;
    child: number;
    fromDate: string;//yyyy-mm-dd
    toDate: string;
    roomId: number;
    sessionId: Nullable<string>;
}

export interface FindCartItemRequest {
    sessionId: Nullable<string>;
    roomId: number;
}

export interface OptionFilterRequest {
    hotelFacilities?: number[],
    benefits?: number[],
    guestRating?: number,
    discount?: number,
    priceFrom?: number,
    priceTo?: number
}
