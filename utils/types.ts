type OrderStatus =
  | "Pending"
  | "Picked up"
  | "Delivered"
  | "Received"
  | "Cancelled";

type PaymentStatus = "paid" | "pending" | "cancelled" | "failed";

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
  order_type: string;
  created_at: string;
  updated_at: string;
};

export interface IOrderBase {
  id: "string";
  total_cost: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  order_type: "string";
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

export type ItemOrderType = {
  item_id: string;
  name: string;
  description: string;
  image_url: string;
  item_order: Item;
};

// export type ItemOrderType = {
//   id?: string;
//   name?: string;
//   origin?: string;
//   destination?: string;
//   distance?: string;
//   created_at?: string;
//   vendor_username?: string;
//   owner_phone_number?: string;
//   description?: string;
//   dispatch_company_name?: string;
//   dispatch_company_phone_numer?: string;
//   rider_name?: string;
//   rider_phone_number?: string;
//   total_cost: number;
//   amount_payable_food: number;
//   order_photo_url: string;
//   order_status?: OrderStatus;
//   deduction: number;
//   payment_status: PaymentStatus;
//   payment_url: string;
// };

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
  location: string;
  confirmPassword: string;
};
export type UpdateProfileImage = {
  profileImageUrl: string;
};

type TransactionType = "deposit" | "withdrawal" | string;
type PaymentTransactionType = "pay_with_wallet" | "fund_wallet" | string;

export type Transaction = {
  id: string;
  amount: string;
  username: string;
  transaction_type: TransactionType;
  payment_transaction_type: PaymentTransactionType;
  created_at: string;
};

export type Transactions = {
  user_id: string;
  id: string;
  balance: string;
  transactions: Transaction[];
};

type Role = "admin" | "vendor" | "dispatcher" | "rider" | "staff";
export type UserReturn = {
  id: string;
  dispatch_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
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

export type UpdateUser = {
  firstName: string;
  lastName: string;
  location: string;
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
