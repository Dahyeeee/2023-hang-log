import { useAutoScroll } from '@/hooks/common/useAutoScroll';
import { useScrollFocus } from '@/hooks/common/useScrollFocus';
import { focusedIdState } from '@/store/scrollFocus';
import type { TripItemData } from '@type/tripItem';
import { Button, Divider, Heading, Text, Toast, useOverlay } from 'hang-log-design-system';
import { Fragment, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useDayLogOrderMutation } from '@hooks/api/useDayLogOrderMutation';
import { useDragAndDrop } from '@hooks/common/useDragAndDrop';

import TripItem from '@components/common/TripItem/TripItem';
import {
  addItemButtonStyling,
  containerStyling,
  emptyTextStyling,
} from '@components/common/TripItemList/TripItemList.style';

interface TripItemListProps {
  tripId: number;
  dayLogId: number;
  tripItems: TripItemData[];
}

const TripItemList = ({ tripId, dayLogId, tripItems }: TripItemListProps) => {
  const dayLogOrderMutation = useDayLogOrderMutation();
  const { observer } = useScrollFocus();
  const listRef = useRef<HTMLOListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const { scrollToFocusedItem } = useAutoScroll(listRef, itemRef);
  const focusedId = useRecoilValue(focusedIdState);
  const { isOpen: isErrorTostOpen, open: openErrorToast, close: closeErrorToast } = useOverlay();

  useEffect(() => {
    scrollToFocusedItem();
  }, [focusedId, scrollToFocusedItem]);

  const handlePositionChange = (newItems: TripItemData[]) => {
    const itemIds = newItems.map((item) => item.id);

    dayLogOrderMutation.mutate(
      { tripId, dayLogId, itemIds },
      {
        onError: () => {
          handleItemsUpdate(tripItems);
          openErrorToast();
        },
      }
    );
  };

  const { items, handleItemsUpdate, handleDragStart, handleDragEnter, handleDragEnd } =
    useDragAndDrop(tripItems, handlePositionChange);

  useEffect(() => {
    handleItemsUpdate(tripItems);
  }, [handleItemsUpdate, tripItems]);

  return (
    <>
      <ol css={containerStyling} ref={listRef}>
        {items.map((item, index) => (
          <Fragment key={item.id}>
            <TripItem
              tripId={tripId}
              dayLogId={dayLogId}
              observer={observer}
              onDragStart={handleDragStart(index)}
              onDragEnter={handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              ref={focusedId === tripId ? itemRef : null}
              {...item}
            />
            <Divider />
          </Fragment>
        ))}
      </ol>
      {isErrorTostOpen && (
        <Toast variant="error" closeToast={closeErrorToast}>
          아이템 순서 변경을 실패했습니다. 잠시 후 다시 시도해 주세요.
        </Toast>
      )}
    </>
  );
};

TripItemList.Empty = ({ openAddModal }: { openAddModal: () => void }) => {
  return (
    <>
      <Heading size="xSmall">아직 추가된 일정 기록이 없습니다!</Heading>
      <Text css={emptyTextStyling}>
        여행하면서 갔던 장소, 사용했던 경비와 같은 여행 일정 기록들을 추가해 보세요.
      </Text>
      {/* 클릭하면 일정 추가 모달 열기 */}
      <Button css={addItemButtonStyling} type="button" variant="primary" onClick={openAddModal}>
        일정 기록 추가하기
      </Button>
    </>
  );
};

export default TripItemList;
