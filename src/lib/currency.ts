export const formatPrice = (amount: number) => {
  try {
    return `Rs. ${Number(amount).toLocaleString("en-NP")}`;
  } catch {
    return `Rs. ${amount}`;
  }
};
