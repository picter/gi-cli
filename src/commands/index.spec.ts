import { selectCommand, list, checkout } from '.';

test('Empty command parameter results in list command.', () => {
  expect(selectCommand('')).toEqual(list);
});

test('0 as command parameter results in list command.', () => {
  expect(selectCommand('0')).toEqual(list);
});

test('1 as command parameter results in checkout command.', () => {
  expect(selectCommand('1')).toEqual(checkout);
});
