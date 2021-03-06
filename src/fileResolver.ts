import * as micromatch from "micromatch";

export function resolve(input: string, mapping: Array<string>): string | false {
  for (let [index, pattern] of mapping.entries()) {
    let matches = micromatch.capture(pattern, input.replace(/\\/g, "/"));

    if (matches) {
      let next = (index + 1) % mapping.length;
      let output = mapping[next];

      matches.forEach((match) => {
        output = output.replace(/(\*\*|\*)/, match);
      });

      return output;
    }
  }

  return false;
}
