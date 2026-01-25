// 沖煮步驟與開關狀態常數

export const BREW_STEP_TYPES = {
  BLOOM: 'bloom',
  POUR: 'pour',
  WAIT: 'wait',
} as const;

export const SWITCH_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
} as const;
