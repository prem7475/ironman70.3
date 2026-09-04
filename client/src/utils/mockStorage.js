export const getMockWalletBalance = () => {
  const stored = localStorage.getItem('paceforge_wallet_balance');
  return stored !== null ? Number(stored) : 5000;
};

export const updateMockWalletBalance = (amount, type) => {
  const current = getMockWalletBalance();
  const numAmount = Number(amount || 0);
  const newBalance = type === 'CREDIT' ? current + numAmount : Math.max(0, current - numAmount);
  localStorage.setItem('paceforge_wallet_balance', String(newBalance));
  return newBalance;
};

export const getMockWalletTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem('paceforge_wallet_txs') || '[]');
  } catch {
    return [];
  }
};

export const addMockWalletTransaction = (tx) => {
  const list = getMockWalletTransactions();
  const updated = [tx, ...list];
  localStorage.setItem('paceforge_wallet_txs', JSON.stringify(updated));
  return updated;
};

export const getMockRegistrations = () => {
  try {
    return JSON.parse(localStorage.getItem('paceforge_mock_registrations') || '[]');
  } catch {
    return [];
  }
};

export const saveMockRegistration = (registration) => {
  const list = getMockRegistrations();
  const updated = [registration, ...list.filter((r) => r.registrationId !== registration.registrationId)];
  localStorage.setItem('paceforge_mock_registrations', JSON.stringify(updated));
  return registration;
};

export const getMockRegistrationById = (registrationId) => {
  const list = getMockRegistrations();
  return list.find((r) => r.registrationId === registrationId) || null;
};
