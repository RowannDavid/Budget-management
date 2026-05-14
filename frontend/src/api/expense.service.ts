import api from './axios';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    const response = await api.get<Expense[]>('/expenses?max=100');
    return response.data;
  },

  async create(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const response = await api.post<Expense>('/expenses', expense);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/expenses/${id}`);
  }
};
