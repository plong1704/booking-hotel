import { HotelResponse, RoomResponse } from './response';

export interface CartItem {
  id: number;
  adult: number;
  child: number;
  fromDate: number[];
  toDate: number[];
  hotel: HotelResponse;
  room: RoomResponse;
  sessionId: string;
  address: string;
  bannerImage: string;
  totalReviews: number;
  roomType: string;
  benefits: Benefit[];
  status: string;
  discountPercent: number;
}

export interface ReservationRequest {
  adult: number;
  children: number;
  startDate: string;
  endDate: string;
  username: string;
  hotelId: number;
  roomId: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface Benefit {
  name: string;
  code: string;
}

export interface ApiResponse {
  data: string;
  message: string;
  statusCode: number;
}

export interface Room {
  id: number;
  type: string;
  beds: number;
  price: number;
  adult: number;
  child: number;
  amenities: Amenity[];
}

export interface Amenity {
  id: number;
  name: string;
}

export interface Cart {
  items: CartItem[];
}

export interface PaypalToken {
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
  scope: string;
  token_type: string;
}

export interface PaymentLink {
  href: string;
  method: string;
  rel: string;
}

export interface PaymentTransaction {
  amount: { total: string; currency: string };
  related_resources: { sale: { id: string; state: string } }[];
}

export interface PaymentResponse {
  create_time: string;
  id: string;
  intent: string;
  links: PaymentLink[];
  payer: { payment_method: string };
  state: string;
  transactions: PaymentTransaction[];
}

export interface PaymentResultResponse {
  cart: string;
  create_time: string;
  intent: string;
  links: PaymentLink[];
  status: string;
  payer: { payment_method: string };
  state: string;
  transactions: PaymentTransaction[];
}

export interface PaymentResultResponse {
  cart: string;
  create_time: string;
  intent: string;
  links: PaymentLink[];
  status: string;
}

export interface RedirectInfo {
  label: string;
  path: string;
  icon?: string;
}
export interface OccupancyOption {
  idx: number;
  label: string;
  subLabel?: string;
  value: number;
  name: string;
}

export interface Basic {
  typeComparisionBusiness: string;
  numComparisionBusiness: number;
  numAccommodations: number;
  numBathroom: number;
  numBedroom: number;
  numRoomOne: number;
  typeRoomOne: string;
  numCommon: number;
  typeCommon: string;
}

export interface Location {
  address: string;
  house: string;
  country: string;
  city: string;
}

export interface Description {
  nameHouse: string;
  descHouse: string;
  suggest: string;
  rule: string;
  move: string;
  star: number;
}

export interface Amenities {
  recomendation: string[];
}

export interface MySelf {
  firstName: string;
  lastName: string;
  date: string;
}

export interface Company {
  nameCompany: string;

  addressCompany: string;

  codeAreaCompany: string;
}

export interface Photos {
  file: string;
  fileSource: string[];
}

export interface Pricing {
  managerChannel: string;
  payment: string;
  price: number;
}

export interface Profile {
  typeHost: string;
  company: Company;
  mySelf: MySelf;
}

export interface HotelProfile {
  id: number;
  basic: Basic;
  location: Location;
  description: Description;
  amenities: Amenities;
  pricing: Pricing;
  photos: Photos;
  profile: Profile;
}
export interface ProvinceFinal {
  code: string;
  name: string;
  domain: string;
}
export interface DistrictFinal {
  id: number;
  createBy: string;
  createDate: string;
  modifiedDate: Date;
  street: string;
  name: string;
  prefix: string;
  province: ProvinceFinal;
}
export interface WardFinal {
  id: number;
  createBy: string;
  createDate: string;
  modifiedDate: Date;
  name: string;
  prefix: string;
  district: DistrictFinal;
  province: ProvinceFinal;
}
export interface AddressFinal {
  id: number;
  createBy: string;
  createDate: string;
  modifiedDate: Date;
  street: string;

  district: DistrictFinal;

  ward: WardFinal;

  province: ProvinceFinal;
}

export interface HotelProfileFinal {
  id: number;

  createBy: string;
  createDate: Date;

  modifiedBy: string;

  modifiedDate: Date;
  name: String;

  description: String;

  averagePoints: number;
  status: String;

  address: AddressFinal;

  username: String;
}

export interface Occupancy {
  idx: number;
  label: string;
  subLabel?: string;
  value: number;
  childOptions?: string[];
  add(occupancy: Occupancy): void;
  remove(occupancy: Occupancy): void;
}

// DTO
export interface UserDTO {
  id: number;
  username: string;
  email: string;
  dob: Date;
  gender: string;
  fullName: string;
  phone: string;
  createdDate: string;
  avatarUrl: string;
  coverUrl: string;
}
export interface JWTDTO {
  token: string;
  tokenExpirationDate: Date;
}
