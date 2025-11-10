
import { Category, TransactionType } from './types';

export const CATEGORIES: { [key in TransactionType]: Category[] } = {
  [TransactionType.EXPENSE]: [
    Category.FOOD,
    Category.TRAVEL,
    Category.SHOPPING,
    Category.RENT,
    Category.HEALTH,
    Category.ENTERTAINMENT,
    Category.UTILITIES,
    Category.OTHERS,
  ],
  [TransactionType.INCOME]: [
    Category.SALARY,
    Category.FREELANCE,
    Category.OTHERS,
  ],
};
