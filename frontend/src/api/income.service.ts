import api from './axios';

export interface Income {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export const incomeService = {
  async getAll(): Promise<Income[]> {
    const response = await api.get<Income[]>('/incomes?max=100');
    return response.data;
  },

  async create(income: Omit<Income, 'id'>): Promise<Income> {
    const response = await api.post<Income>('/incomes', income);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/incomes/${id}`);
  }
};
