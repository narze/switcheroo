import * as micromatch from 'micromatch';

export function resolve(input: String, mapping: Array<String>): String|boolean {
  for (let [index, pattern] of mapping.entries()) {
    let matches = micromatch.capture(pattern, input);

    if (matches !== undefined) {
      let next = (index + 1) % mapping.length;
      let output = mapping[next];

      matches.forEach(match => {
        output = output.replace(/(\*\*|\*)/, match);
      });

      return output;
    }
  }

  return false;
}
