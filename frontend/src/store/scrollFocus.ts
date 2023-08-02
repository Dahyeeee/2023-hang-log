import { atom } from 'recoil';

export const focusedIdState = atom<number>({
  key: 'focusedId',
  default: 0,
});

export const markerFocusIdStat = atom<number>({
  key: 'markerId',
  default: 0,
});
