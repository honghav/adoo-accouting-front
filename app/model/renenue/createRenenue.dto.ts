import { PaymentMethod, StatusRevenue, type TypeRevenue } from "./renenue.dto";

export interface createRevenuePayload {
  type_revenue?: TypeRevenue;
  seller?: string;
  approve?: boolean;
  customer_name: string;
  status?: StatusRevenue;
  amount: number;
  payment_method?: PaymentMethod;
  bank_transaction?: string;
  image?: string;
  note?: string;
}