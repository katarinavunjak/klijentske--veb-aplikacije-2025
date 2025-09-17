import { CartItemModel } from "./cart-item.model";

export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  favouriteGenres: string[];
  password: string;
  cart: CartItemModel[];
}

