export enum TypeRevenue {
    SELL = 'sell',
    LOAN = 'loan',
    MAMBER_FEE = 'member_fee',
    RETURN = 'return',
    OTHER = 'other'
}
export enum StatusRevenue {
    PENDING = 'pending',
    APPROVED = 'approved',
    RETURN = 'return',
}
export enum PaymentMethod {
    CASH = 'cash',
    TRANSFER = 'transfer',
    E_WALLET = 'e_wallet',
    OTHER = 'other'
}
export interface RevenueDTO {
    id: string,
    type_revenue: TypeRevenue,
    seller: string,
    approve: boolean,
    customer_name: string,
    status: StatusRevenue,
    amount: string,
    payment_method: PaymentMethod,
    bank_transaction?: string,
    image?: string,
    note?: string
}