export enum Status {
    Paid = 'Paid',
}

export enum Category {
    Grocery = 'Grocery',
}

//TODO: Create a smaller type with only amount and
export type Transaction = {
    id: string;
    amount: number;
    date: string;
    status: Status;
    category: Category;
};
