import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export type TransactionsResponse = {
  id: number;
  target_id: number;
  amount: number;
  observation: string;
  created_at: Date;
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

  async function listByTargetId(id: number) {
    return await database.getAllAsync<TransactionsResponse>(
      `
      SELECT
        id,
        target_id,
        amount,
        observation,
        created_at
      FROM transactions
      WHERE target_id = ?
      ORDER BY created_at DESC
      `,
      id
    );
  }

  return {
    create,
    listByTargetId,
  };
}