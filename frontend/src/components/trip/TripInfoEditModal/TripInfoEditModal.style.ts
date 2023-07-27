import { css } from '@emotion/react';
import { Theme } from 'hang-log-design-system';

export const formStyling = css({
  display: 'flex',
  flexDirection: 'column',
  gap: Theme.spacer.spacing3,

  '> button': {
    width: '400px',
  },
});

export const titleStyling = css({
  flexDirection: 'column',
  width: '400px',
  gap: '4px',

  '> div': {
    width: '100%',
  },
});

export const textareaStyling = css({
  resize: 'none',
  fontFamily: 'none',
});