const BAR_SERVICE_URL = import.meta.env.BAR_SERVICE_URL;

export async function getFoo() {
  const response = await fetch("https://api.docker.localhost/foo");
  return response.text();
}
