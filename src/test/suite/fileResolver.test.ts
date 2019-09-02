import * as assert from 'assert';
import { before } from 'mocha';
import * as fs from 'fs';
import * as path from 'path';

import * as fileResolver from '../../fileResolver';

suite('Resolve file name', () => {
	test('Resolve absolute match', async () => {
    let mapping:string[] = [
      "app/hello.txt",
      "test/hello_test.txt",
    ];

    let input = "app/hello.txt";
    let expected = "test/hello_test.txt";

    assert(fileResolver.resolve(input, mapping) === expected);
  });

	test('Resolve absolute match with cycle', async () => {
    let mapping:string[] = [
      "app/hello.txt",
      "test/hello_test.txt",
    ];

    let input = "test/hello_test.txt";
    let expected = "app/hello.txt";

    assert(fileResolver.resolve(input, mapping) === expected);
  });

	test('Resolve no match by returning false', async () => {
    let mapping:string[] = [
      "app/hello.txt",
      "test/hello_test.txt",
    ];

    let input = "app/foo.txt";
    let expected = false;

    assert(fileResolver.resolve(input, mapping) === false);
  });

  test('Resolve match with **', async () => {
    let mapping:string[] = [
      "app/**.txt",
      "test/**_test.txt",
    ];

    let input = "app/hi.txt";
    let expected = "test/hi_test.txt";

    assert(fileResolver.resolve(input, mapping) === expected);
  });
});
