import { Amenity } from "./model";

export const API_PREFIX = "/api";

export const GET_CART_BY_SESSION_ID = `${API_PREFIX}/carts/getCartBySessionId`;
export const DELETE_ITEM_FROM_CART = `${API_PREFIX}/carts/deleteItemFromCart`;
export const DELETE_BY_IDS = `${API_PREFIX}/carts/deleteByIds`;
export const ADD_TO_CART = `${API_PREFIX}/carts/addToCart`
export const GET_CART_ITEM_BY_SESSION_ROOM_ID = `${API_PREFIX}/carts/getBySessionIdAndRoomId`;
export const TEXT_SPACE_REGEX = "^[a-zA-Z\\s]*$"
export const NUMBER_REGEX = "^[0-9]*$"


//demo
export const amenities: Amenity[] = [
    {
        id: 1,
        name: 'Wifi',
    },
    {
        id: 2,
        name: 'Bãi đậu xe',
    },
];

export const ADD_RESERVATION = `${API_PREFIX}/reservations/saveReservation`;
export const ADD_ALL_RESERVATION = `${API_PREFIX}/reservations/saveAllReservation`;

export const SAVE_FAVORITE_HOTEL = `${API_PREFIX}/favorites/save`;
export const FIND_ALL_FAVORITE_HOTEL = `${API_PREFIX}/favorites/findAllByUsername`;
export const DELETE_FAVORITE_HOTEL_BY_ID = `${API_PREFIX}/favorites/deleteById`;

export const URL_API = "http://localhost:8080";
export const URL_CLIENT = "http://localhost:4200";

export const DIRECT_LINK = `${URL_API}/uploads`
export const HOTEL_IMG = `${DIRECT_LINK}/hotel-img/`;

export const ONE_DOLLAR_IN_USD = 23456;



export const SUCCESS_ALERT_TITLE = "Thành công"
export const SUCCESS_ALERT_ICON = "success"

export const FAIL_SERVER_ALERT_TEXT = "Đây là lỗi của chúng tôi. Vui lòng đăng nhập sau"
export const FAIL_ALERT_TITLE = "Thất bại"
export const FAIL_ALERT_ICON = "danger"

export const UPLOAD_PATH = `${URL_API}/uploads`;
export const USER_AVATAR_PATH = `${UPLOAD_PATH}/avatar/`
export const USER_COVER_PATH = `${UPLOAD_PATH}/cover/`