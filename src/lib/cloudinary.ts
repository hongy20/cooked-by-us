export async function upload(_file: File) {
  return Promise.resolve(`https://example.com/image.jpg?t=${Date.now()}`);
}
