export interface ITransaction {
  amount: number;
  metadata: Record<string, string | number>;
  payment_reference: string;
  status: string;
  type: string;
  date: string;
}
