import list from './list'
import checkout from './checkout'

export const selectCommand = (command: string) => {
  return list;
}

export { default as list } from './list';
export { default as checkout } from './checkout';
