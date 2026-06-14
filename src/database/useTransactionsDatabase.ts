import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export function useTransactionsDataBase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {
    await database.runAsync(
      `
      INSERT INTO transactions
      (target_id, amount, observation)
      VALUES (?, ?, ?)
      `,
      data.target_id,
      data.amount,
      data.observation ?? null
    );
  }

  return {
    create,
  };
}