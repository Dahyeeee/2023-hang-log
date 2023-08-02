import { CURRENCY_ICON } from '@constants/trip';
import type { TripItemData } from '@type/tripItem';
import { Flex, ImageCarousel, Text, Theme } from 'hang-log-design-system';
import { forwardRef, useEffect, useRef } from 'react';
import type { ForwardedRef } from 'react';

import { formatNumberToMoney } from '@utils/formatter';

import { useDraggedItem } from '@hooks/common/useDraggedItem';

import StarRating from '@components/common/StarRating/StarRating';
import EditMenu from '@components/common/TripItem/EditMenu/EditMenu';
import {
  expenseStyling,
  getContainerStyling,
  memoStyling,
  starRatingStyling,
} from '@components/common/TripItem/TripItem.style';

interface TripListItemProps extends TripItemData {
  tripId: number;
  dayLogId: number;
  isEditable?: boolean;
  observer?: IntersectionObserver | null;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
}

const TripItem = (
  {
    tripId,
    dayLogId,
    isEditable = true,
    observer,
    onDragStart,
    onDragEnter,
    onDragEnd,
    ...information
  }: TripListItemProps,
  ref: ForwardedRef<HTMLLIElement>
) => {
  const { isDragging, handleDrag, handleDragEnd } = useDraggedItem(onDragEnd);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      observer?.observe(itemRef.current);
    }
  }, [observer]);

  return (
    <li
      ref={itemRef}
      css={getContainerStyling({ isEditable, isDragging })}
      data-id={information.id}
      draggable={isEditable}
      onDragStart={onDragStart}
      onDrag={isEditable ? handleDrag : undefined}
      onDragEnter={onDragEnter}
      onDragEnd={isEditable ? handleDragEnd : undefined}
    >
      <li ref={ref} id={String(information.id)} />
      <Flex ref={ref} styles={{ gap: Theme.spacer.spacing4 }}>
        {information.imageUrls.length > 0 && (
          <ImageCarousel
            width={250}
            height={167}
            isDraggable={false}
            showNavigationOnHover
            showArrows
            showDots
            images={information.imageUrls}
          />
        )}
        {information.rating && <StarRating css={starRatingStyling} rate={information.rating} />}
        {information.memo && (
          <Text css={memoStyling} size="small">
            {information.memo}
          </Text>
        )}
        {information.expense && (
          <Text css={expenseStyling} size="small">
            {information.expense.category.name} · {CURRENCY_ICON[information.expense.currency]}
            {formatNumberToMoney(information.expense.amount)}
          </Text>
        )}
      </Flex>
      {isEditable ? <EditMenu tripId={tripId} dayLogId={dayLogId} {...information} /> : null}
    </li>
  );
};

export default forwardRef(TripItem);
