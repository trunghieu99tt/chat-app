import { atom } from 'recoil';
import { iChannel } from '../types/channel.types';

export const channelState = atom<iChannel[] | null>({
    key: 'roomState',
    default: null
})