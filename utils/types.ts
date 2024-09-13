export type OrderStatus =
  | "Pending"
  | "Picked up"
  | "Delivered"
  | "Received"
  | "Cancelled";

export type PaymentStatus = "paid" | "pending" | "cancelled" | "failed";
type OrderType = "delivery" | "food" | "laundry";

type AccountStatus = "pending" | "confirmed";

type Item = {
  id: string;
  vendor_id: string;
  vendor_username: string;
  delivery_fee: number;
  item_id: string;
  origin: string;
  destination: string;
  distance: number;
  commission_delivery: number;
  total_cost: number;
  amount_payable_delivery: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_url: string;
  vendor_phone_number: string;
  order_type: OrderType;
  created_at: string;
  updated_at: string;
};

export interface IOrderBase {
  id: "string";
  total_cost: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  order_type: OrderType;
  payment_url: "string";
  vendor_username: "string";
  delivery_fee: number;
  order_owner_username: "string";
  dispatch_company_phone_number: "string";
  vendor_phone_number: "string";
  order_owner_phone_number: "string";
  dispatch_company_name: "string";
  rider_phone_number: "string";
  rider_image_url: "string";
  rider_name: "string";
  rider_bike_plate_number: "string";
  created_at: Date;
  updated_at: Date;
}

export interface FoodOrderType extends IOrderBase {
  amount_payable_food: number;
  commission_food: number;
  food_cost: number;
}

export interface LaundryOrderType extends IOrderBase {
  amount_payable_laundry: number;
  commission_laundry: number;
  laundry_cost: number;
}

// export type ItemOrderType = {
//   item_id: string;
//   name: string;
//   description: string;
//   image_url: string;
//   item_order: Item;
// };

type FoodUserType = {
  image_url: string;
};

export type ItemOrderType = {
  id?: string;
  package_name?: string;
  origin?: string;
  destination?: string;
  distance?: string;
  created_at?: string;
  vendor_username?: string;
  owner_phone_number?: string;
  order_owner_username?: string;
  description?: string;
  dispatch_company_name?: string;
  dispatch_company_phone_numer?: string;
  rider_name?: string;
  image_url?: string;
  vendor_phone_number?: string;
  commission_delivery?: number;
  rider_phone_number?: string;
  total_cost: number;
  amount_payable_delivery: number;
  order_photo_url: string;
  order_status?: OrderStatus;
  order_type: OrderType;
  deduction: number;
  payment_status: PaymentStatus;
  payment_url: string;
  foods: FoodUserType[];
};

export type CreateOrderType = {
  name: string;
  origin: string;
  destination: string;
  distance?: string;
  description: string;
  orderPhotoUrl: string;
};

export type CreateDispatch = {
  email: string;
  companyName: string;
  phoneNumber: string;
  companyRegNum?: string;
  password: string;
  confirmPassword: string;
};

export type CreateUser = {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type CreateRider = {
  fullName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  password: string;
  confirmPassword: string;
};
export type UpdateProfileImage = {
  profileImageUrl: string;
};
export type SetupCompany = {
  image: string;
  openingHour: string;
  closingHour: string;
};

type TransactionType = "deposit" | "withdrawal" | string;
type PaymentTransactionType = "pay_with_wallet" | "fund_wallet" | string;

export type Transaction = {
  id: string;
  amount: string;
  username: string;
  transaction_type: TransactionType;
  payment_transaction_type: PaymentTransactionType;
  fund_status: PaymentStatus;
  created_at: string;
};

export type Transactions = {
  user_id: string;
  id: string;
  balance: string;
  transactions: Transaction[];
};

type Role = "admin" | "vendor" | "dispatcher" | "rider" | "staff";
export type OpeningHourReturn = {
  sample_company_image: string;
  opening_hour: string;
  closing_hour: string;
};
export type UserReturn = {
  id: string;
  dispatch_id: string;
  full_name: string;
  bank_name: string;
  email: string;
  username: string;
  phone_number: string;
  bank_account_number: string;
  account_holder_name: string;
  location: string;
  photo_url: string;
  user_type: Role;
  company_name: string;
  company_reg_number: string;
  notification_token: string;
  plate_number: string;
  is_suspended: true;
  account_status: AccountStatus;
  confirm_email: number;
  confirm_phone_number: number;
  created_at: string;
  updated_at: string;
  dispatch: string;
};

export type UpdateDispatch = {
  companyRegNumber: string;
  location: string;
  bankName: string;
  accountHolderName: string;
  bankAccountNumber: string;
};

export type UpdateRider = {
  fullName: string;
  location: string;
  plateNumer: string;
  photoUrl: string;
};

export type Login = {
  username: string;
  password: string;
};
export type ConfirmAccount = {
  emailCode: string;
  phoneCode: string;
};

export type FoodType = {
  id: string;
  vendor_id: string;
  name: string;
  price: number;
  side?: string;
  ingredients: string;
  image_url: string;
};

export type AddMealType = {
  name: string;
  price: string;
  category: string;
  side?: string;
  ingredients: string;
  image: string;
};

type Food = {
  id: string;
  vendor_id: string;
  name: string;
  price: string;
  quantity: number;
  side: string;
  ingredients: string;
  image_url: string;
};

export type FoodReturnType = {
  id: string;
  amount_payable_food: string;
  commission_food: string;
  delivery_fee: string;
  food_cost: string;
  total_cost: string;
  order_status: string;
  payment_status: string;
  order_type: string;
  payment_url: string;
  order_owner_username: string;
  dispatch_company_phone_number: string;
  vendor_phone_number: string;
  order_owner_phone_number: string;
  dispatch_company_name: string;
  rider_phone_number: string;
  rider_image_url: string;
  rider_name: string;
  rider_bike_plate_number: string;
  foods: Food[];
  created_at: string;
  updated_at: string;
};

export type CartSummaryType = {
  id: string;
  foods?: Food[];
  delivery_fee: number;
  food_cost?: number;
  total_cost: null;
};

export type ListingResponseType = {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string;
  image_url: string;
  image_urls: string[];
};

export type CreateListingType = {
  name: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  images: string[];
};

export type CreateLaundry = {
  name: string;
  price: string;
  image: string;
};

export type CreateLaundryResponse = {
  name: string;
  price: string;
  image_url: string;
  id: string;
  vendor_id: string;
  detail?: string;
};

type Comment = {
  rating: number;
  comment: string;
};

export type ReviewType = {
  rating: number;
  average_rating: string;
  comments: Comment[];
};

export type UpdateUser = {
  fullName?: string;
  bankName: string;
  bankAccountNumber: string;
  accountHolderName: string;
  companyRegNum?: string;
};
