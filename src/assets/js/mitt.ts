import type { Emitter } from 'mitt';
import mitt from 'mitt';

type Events = {
  'move-left': any
};

export const emitter: Emitter<Events> = mitt<Events>();
