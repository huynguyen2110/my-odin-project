import { capitalize, reverseString, calculator, caesarCipher, analyzeArray } from "./index.js";

xdescribe( 'capitalize', () => {
    test('capitalize normal', () => {
        expect(capitalize('hello')).toBe('Hello');
    });
    test('capitalize special character', () => {
        expect(capitalize('!special')).toBe('!special');
    });
    test('capitalize number', () => {
        expect(capitalize(12345)).toBe(12345);
    });
    test('capitalize number string', () => {
        expect(capitalize('12345')).toBe('12345');
    });
});

xdescribe('reverseString', () => {
    test('reverseString normal', () => {
        expect(reverseString('hello')).toBe('olleh');
    });
    test('reverseString special character', () => {
        expect(reverseString('!special')).toBe('laiceps!');
    });
    test('reverseString number', () => {
        expect(reverseString(12345)).toBe(false);
    });
    test('reverseString number string', () => {
        expect(reverseString('12345')).toBe('54321');
    });
    test('reverseString duplicate', () => {
        expect(reverseString('looppool')).toBe('looppool');
    });
});

xdescribe('calculator', () => {
    test('add', () => {
        expect(calculator.add(1, 3)).toBe(4);
    });
    test('subtract', () => {
        expect(calculator.subtract(8, 3)).toBe(5);
    });
    test('divide', () => {
        expect(calculator.divide(6, 3)).toBe(2);
    });
    test('multiply', () => {
        expect(calculator.multiply(1, 3)).toBe(3);
    });
});

xdescribe('caesarCipher', () => {
    test('caesarCipher normal', () => {
        expect(caesarCipher('abc', 3)).toBe('def');
    });
    test('caesarCipher loop', () => {
        expect(caesarCipher('xyz', 3)).toBe('abc');
    });
    test('caesarCipher upper character', () => {
        expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
    });
    test('caesarCipher special character', () => {
        expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
    });
});

describe('analyzeArray', () => {
    test('analyzeArray normal', () => {
        expect(analyzeArray([1,8,3,4,2,6])).toEqual({
            average: 4,
            min: 1,
            max: 8,
            length: 6
        });
    });
    test('analyzeArray length 0', () => {
        expect(analyzeArray([])).toEqual({
            average: 0,
            min: null,
            max: null,
            length: 0
        });
    });
});



