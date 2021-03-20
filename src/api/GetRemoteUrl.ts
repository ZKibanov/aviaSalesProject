export default class GetRemoteUrl {
  static async getResource<T>(url: string): Promise<T | null> {
    const res = await fetch(url);
    if (!res.ok) {
      /* eslint-disable no-console */
      console.log(`Huoston,we have a problem: ${res.status} at ${url}`);
      /* eslint-enable no-console */
      return null;
    }
    const body = await res.json();
    return body;
  }
}
