import { selectCommand, list, checkout, merge, unknown } from '.';

test('Empty command parameter results in list command.', () => {
  expect(selectCommand('')).toEqual(list);
});

test('List command parameter results in list command.', () => {
  expect(selectCommand('list')).toEqual(list);
});

test('0 as command parameter results in unknown command.', () => {
  expect(selectCommand('0')).toEqual(unknown);
});

test('1 as command parameter results in checkout command.', () => {
  expect(selectCommand('1')).toEqual(checkout);
});

test('Single space as command parameter results in unknown command.', () => {
  expect(selectCommand(' ')).toEqual(unknown);
});

test('Merge command parameter results in merge command.', () => {
  expect(selectCommand('merge')).toEqual(merge);
});
