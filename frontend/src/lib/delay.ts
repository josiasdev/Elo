export function delay(milliseconds = 250): Promise<void> {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, milliseconds)
  })
}
