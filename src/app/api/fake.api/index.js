export const data = {
  users: [
    {
      id: "user-id-1",
      name: "John",
      email: "john@example.com",
      accounts: [
        {
          id: "account-id-1",
          name: "Сбербанк",
          userId: "user-id-1",
          category: ["category-id-1"],
          balance: 90000,
          transactions: ["transaction-id-1", "transaction-id-2"]
        },
        {
          id: "account-id-2",
          name: "Альфа-банк",
          userId: "user-id-1",
          category: ["category-id-2"],
          balance: 80000,
          transactions: ["transaction-id-3", "transaction-id-4"]
        }
      ],
      categories: [
        {
          id: "category-id-1",
          name: "Зарплата",
          userId: "user-id-1",
          accounts: ["account-id-1"],
          incomeTransactions: ["transaction-id-1", "transaction-id-3"],
          expenseTransactions: ["transaction-id-5"]
        },
        {
          id: "category-id-2",
          name: "Аренда",
          userId: "user-id-1",
          accounts: ["account-id-2"],
          incomeTransactions: [],
          expenseTransactions: ["transaction-id-2"]
        }
      ],
      transactions: [
        {
          id: "transaction-id-1",
          account: "account-id-1",
          category: "category-id-1",
          amount: 5000,
          type: "income",
          date: "2022-03-01T10:00:00Z",
          userId: "user-id-1"
        },
        {
          id: "transaction-id-2",
          account: "account-id-1",
          category: "category-id-2",
          amount: 1000,
          type: "expense",
          date: "2022-03-02T11:00:00Z",
          userId: "user-id-1"
        },
        {
          id: "transaction-id-3",
          account: "account-id-2",
          category: "category-id-1",
          amount: 2000,
          type: "income",
          date: "2022-03-03T12:00:00Z",
          userId: "user-id-1"
        },
        {
          id: "transaction-id-4",
          account: "account-id-2",
          category: "category-id-2",
          amount: 500,
          type: "expense",
          date: "2022-03-04T13:00:00Z",
          userId: "user-id-1"
        },
        {
          id: "transaction-id-5",
          account: "account-id-1",
          category: "category-id-1",
          amount: 1000,
          type: "expense",
          date: "2022-03-05T14:00:00Z",
          userId: "user-id-1"
        }
      ]
    },
    {
      id: "user-id-2",
      name: "Alex",
      email: "alex@example.com",
      accounts: [
        {
          id: "account-id-3",
          name: "Тинькофф",
          userId: "user-id-2",
          category: ["category-id-3"],
          balance: 100
        }
      ],
      categories: [
        {
          id: "category-id-3",
          name: "Кредит",
          userId: "user-id-2",
          accounts: ["account-id-3"],
          incomeTransactions: [],
          expenseTransactions: ["transaction-id-6"]
        }
      ],
      transactions: [
        {
          id: "transaction-id-6",
          account: "account-id-3",
          category: "category-id-3",
          amount: 5000,
          type: "expense",
          date: "2022-03-06T15:00:00Z",
          userId: "user-id-2"
        }
      ]
    }
  ]
};
