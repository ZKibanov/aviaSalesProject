export default class GetRemoteUrl {
  static async getResource<T>(url: string): Promise<T | null> {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Huoston,we have a problem: ${res.status} at ${url}`);
      return null;
    }
    const body = await res.json();
    return body;
  }
}
