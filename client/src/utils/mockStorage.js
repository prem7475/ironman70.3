const getStorageKey = (prefix, userEmail) => {
  const emailKey = String(userEmail || 'guest').toLowerCase().trim();
  return `${prefix}_${emailKey}`;
};

export const getMockWalletBalance = (userEmail) => {
  const key = getStorageKey('paceforge_wallet_bal', userEmail);
  const stored = localStorage.getItem(key);
  // Default wallet balance for NEW accounts is 0
  return stored !== null ? Number(stored) : 0;
};

export const updateMockWalletBalance = (userEmail, amount, type) => {
  const key = getStorageKey('paceforge_wallet_bal', userEmail);
  const current = getMockWalletBalance(userEmail);
  const numAmount = Number(amount || 0);
  const newBalance = type === 'CREDIT' ? current + numAmount : Math.max(0, current - numAmount);
  localStorage.setItem(key, String(newBalance));
  return newBalance;
};

export const getMockWalletTransactions = (userEmail) => {
  const key = getStorageKey('paceforge_wallet_txs', userEmail);
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

export const addMockWalletTransaction = (userEmail, tx) => {
  const key = getStorageKey('paceforge_wallet_txs', userEmail);
  const list = getMockWalletTransactions(userEmail);
  const updated = [tx, ...list];
  localStorage.setItem(key, JSON.stringify(updated));
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
