import type { RefObject } from 'react';

export const useAutoScroll = (
  listRef: RefObject<HTMLElement>,
  focusItemRef: RefObject<HTMLElement>
) => {
  const scrollToFocusedItem = () => {
    const list = listRef.current;
    const focusedItem = focusItemRef.current;

    if (list && focusedItem) {
      focusedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return { scrollToFocusedItem };
};
