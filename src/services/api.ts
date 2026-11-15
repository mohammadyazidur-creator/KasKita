const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("kaskita_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...getAuthHeader(),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const apiService = {
  // Authentication
  login: async (email: string, password: string) => {
    return request<{ success: boolean; data: any; message: string }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (payload: {
    organization_name: string;
    organization_type: string;
    user_name: string;
    phone: string;
    password: string;
    email?: string;
  }) => {
    return request<{ success: boolean; data: any; message: string }>("/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout: async () => {
    return request<{ success: boolean; message: string }>("/logout", {
      method: "POST",
    });
  },

  // Dashboard
  getDashboard: async () => {
    try {
      return await request<{ success: boolean; data: any }>("/dashboard");
    } catch {
      return await request<{ success: boolean; data: any }>("/public/dashboard");
    }
  },

  // Transactions
  getTransactions: async (params?: { type?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const url = `/transactions${query ? `?${query}` : ""}`;
    try {
      return await request<{ success: boolean; data: any[]; summary: any }>(url);
    } catch {
      return await request<{ success: boolean; data: any[]; summary: any }>(`/public${url}`);
    }
  },

  createTransaction: async (payload: {
    description: string;
    amount: number;
    transaction_type: "income" | "expense";
    category_name: string;
    transaction_date: string;
  }) => {
    return request<{ success: boolean; data: any; message: string }>("/transactions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  deleteTransaction: async (id: number | string) => {
    return request<{ success: boolean; message: string }>(`/transactions/${id}`, {
      method: "DELETE",
    });
  },

  // Members
  getMembers: async (params?: { search?: string; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    const url = `/members${query ? `?${query}` : ""}`;
    try {
      return await request<{ success: boolean; data: any[] }>(url);
    } catch {
      return await request<{ success: boolean; data: any[] }>(`/public${url}`);
    }
  },

  createMember: async (payload: { name: string; address?: string; phone?: string }) => {
    return request<{ success: boolean; data: any; message: string }>("/members", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Dues
  getDues: async () => {
    try {
      return await request<{ success: boolean; data: any[] }>("/dues");
    } catch {
      return await request<{ success: boolean; data: any[] }>("/public/dues");
    }
  },

  getDuesPayments: async (year: number = 2026) => {
    try {
      return await request<{ success: boolean; data: any }>(`/dues-payments?year=${year}`);
    } catch {
      return await request<{ success: boolean; data: any }>(`/public/dues-payments?year=${year}`);
    }
  },

  recordDuesPayment: async (payload: {
    dues_id: number;
    member_id: number;
    amount: number;
    payment_date: string;
  }) => {
    return request<{ success: boolean; data: any; message: string }>("/dues-payments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Reports
  getReports: async () => {
    try {
      return await request<{ success: boolean; data: any }>("/reports");
    } catch {
      return await request<{ success: boolean; data: any }>("/public/reports");
    }
  },

  // Settings
  getSettings: async () => {
    try {
      return await request<{ success: boolean; data: any }>("/settings");
    } catch {
      return await request<{ success: boolean; data: any }>("/public/settings");
    }
  },

  updateSettings: async (payload: {
    name: string;
    organization_type: string;
    phone?: string;
    address?: string;
  }) => {
    return request<{ success: boolean; data: any; message: string }>("/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
