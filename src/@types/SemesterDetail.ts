export interface WalletPremium {
  usableFrom: string;
  usableUntil: string;
  byMonthUsability: [{
    usableFrom: string,
    usableUntil: string,
  }];
}

export interface SemesterDetail {
  id: string;
  year: number;
  semester: number;
  usableFrom: string;
  usableUntil: string;
  walletPremium: WalletPremium
}
