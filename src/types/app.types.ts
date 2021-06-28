export interface Size {
    width: number | undefined;
    height: number | undefined;
}

export type TScreenSize = "DESKTOP" | 'LARGE_TABLET' | 'TABLET' | 'MOBILE';

export type TSidebar = "LIST_CHANNEL" | "CHANNEL_DETAIL"