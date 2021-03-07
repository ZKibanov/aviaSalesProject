class getRemoteUrl {
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
       console.log(`Huoston,we have a problem: ${res.status} at ${url}`);
       return;
    }
    const body = await res.json();
    console.log(body.stop)
    return body;
  }
}

export default new getRemoteUrl();
