import { atom } from 'recoil';
import { TSidebar } from '../types/app.types';

export const screenState = atom<TSidebar>({
    key: 'screenState',
    default: 'LIST_CHANNEL'
})
