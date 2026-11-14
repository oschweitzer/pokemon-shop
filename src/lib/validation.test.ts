import { describe, expect, it } from 'vitest';
import { validateEmail, validatePassword } from './validation';

describe('validateEmail', () => {
  it.each(['ash@pallet.town', 'ash.ketchum@kanto.example.org', 'a-b@c.io', 'ash@sub.pallet.town'])(
    'accepts %s',
    (email) => {
      expect(validateEmail(email)).toBe(true);
    },
  );

  it.each(['', 'ash', 'ash@', '@pallet.town', 'ash@pallet', 'ash @pallet.town', 'ash@pallet.t'])(
    'rejects %j',
    (email) => {
      expect(validateEmail(email)).toBe(false);
    },
  );
});

describe('validatePassword', () => {
  it('accepts 8 to 15 characters with every character class', () => {
    expect(validatePassword('Pikachu#25')).toBe(true);
    expect(validatePassword('Aa1!aaaa')).toBe(true);
    expect(validatePassword('Aa1!aaaaaaaaaaa')).toBe(true);
  });

  it.each([
    ['too short', 'Aa1!aaa'],
    ['too long', 'Aa1!aaaaaaaaaaaa'],
    ['no uppercase', 'pikachu#25'],
    ['no lowercase', 'PIKACHU#25'],
    ['no digit', 'Pikachu#!!'],
    ['no symbol', 'Pikachu125'],
    ['whitespace', 'Pika chu#25'],
  ])('rejects a password with %s', (_reason, password) => {
    expect(validatePassword(password)).toBe(false);
  });
});
