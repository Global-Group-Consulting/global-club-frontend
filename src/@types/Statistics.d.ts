export interface Statistic{
    totalUsable: number;
    totalRemaining: number;
    expirations: Expirations[];
    semesters: Semestersny[];
}

export interface Expirations{
    usable: number;
    remaining: number;
    date: Date;
}

export interface Semesters{
    totalRemaining: number;
    totalUsable: number;
    totalUsed: number;
    totalEarned: number;
    expiresAt: Date;
    usableFrom: Date;
    usableNow: boolean;
    packs: Packs;
    semesterId: string;
}
export interface Packs {
    _none: None;
    basic: Basic;
    fast: Fast;
    premium: Premium;
}

export interface SubTotals {
    interest_recapitalized: number;
    deposit_added: number;
    deposit_removed: number;
    deposit_transferred: number;
    deposit_used: number;
}
export interface None {
    totalRemaining: number;
    totalUsable: number;
    totalUsed: number;
    totalEarned: number;
    forcedZero: boolean;
    subTotals: SubTotals;
}

export interface Fast {
    totalRemaining: number;
    totalUsable: number;
    totalUsed: number;
    totalEarned: number;
    forcedZero: boolean;
    subTotals: SubTotals;
}
export interface Premium {
    totalRemaining: number;
    totalUsable: number;
    totalUsed: number;
    totalEarned: number;
    forcedZero: boolean;
    subTotals: SubTotals4;
}