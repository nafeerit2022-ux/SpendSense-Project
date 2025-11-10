
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  FOOD = 'Food',
  TRAVEL = 'Travel',
  SHOPPING = 'Shopping',
  RENT = 'Rent',
  HEALTH = 'Health',
  ENTERTAINMENT = 'Entertainment',
  UTILITIES = 'Utilities',
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  OTHERS = 'Others',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string; // ISO string e.g., "2023-10-27"
  note?: string;
}

export interface Budget {
  amount: number;
}
