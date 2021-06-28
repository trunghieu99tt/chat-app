import { atom } from 'recoil';
import { TScreenSize, TSidebar } from '../types/app.types';

export const screenState = atom<TSidebar>({
    key: 'screenState',
    default: 'LIST_CHANNEL'
})

export const screenSizeState = atom<TScreenSize>({
    key: 'screenSize',
    default: 'DESKTOP'
})

export const showLeftSidebarState = atom<boolean>({
    key: 'showLeftSidebarState',
    default: false
})

export const showRightSidebarState = atom<boolean>({
    key: 'showRightSidebarState',
    default: false
})