export const toTitleCase = (input: string) =>
  input
    .trim()
    .split(' ')
    .map((word) =>
      [word.split('')[0]?.toUpperCase(), ...word.split('').filter((_, i) => i > 0)].join(''),
    )
    .join(' ')
