class GetRemoteUrl {
  async getResource<T>(url: string): Promise<T | any> {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Huoston,we have a problem: ${res.status} at ${url}`);
      return undefined;
    }
    const body = await res.json();
    console.log(body.stop);
    return body;
  }
}

export default new GetRemoteUrl();
