import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PluggyAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  currencyCode: string;
  bankData?: {
    transferNumber?: string;
    closingBalance?: number;
  };
}

interface PluggyTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
  type: string;
}

export const usePluggy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<PluggyAccount[]>([]);
  const [transactions, setTransactions] = useState<PluggyTransaction[]>([]);
  const [connectToken, setConnectToken] = useState<string | null>(null);
  const [connectedItemId, setConnectedItemId] = useState<string | null>(() => {
    return localStorage.getItem("pluggy_item_id");
  });

  const getConnectToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("pluggy-connect-token", {
        body: { userId: "default-user" },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setConnectToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao gerar token";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveItemId = useCallback((itemId: string) => {
    localStorage.setItem("pluggy_item_id", itemId);
    setConnectedItemId(itemId);
  }, []);

  const fetchAccounts = useCallback(async (itemId?: string) => {
    const id = itemId || connectedItemId;
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("pluggy-accounts", {
        body: { itemId: id, action: "accounts" },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setAccounts(data.results || []);
      return data.results;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao buscar contas";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, [connectedItemId]);

  const fetchTransactions = useCallback(async (itemId?: string) => {
    const id = itemId || connectedItemId;
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("pluggy-accounts", {
        body: { itemId: id, action: "transactions" },
      });
      if (fnError) throw new Error(fnError.message);
      if (data?.error) throw new Error(data.error);
      setTransactions(data.results || []);
      return data.results;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao buscar transações";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, [connectedItemId]);

  const disconnect = useCallback(() => {
    localStorage.removeItem("pluggy_item_id");
    setConnectedItemId(null);
    setAccounts([]);
    setTransactions([]);
  }, []);

  return {
    loading,
    error,
    accounts,
    transactions,
    connectToken,
    connectedItemId,
    getConnectToken,
    saveItemId,
    fetchAccounts,
    fetchTransactions,
    disconnect,
  };
};
