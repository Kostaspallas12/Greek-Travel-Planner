const ENDPOINTS = {
  autocomplete: "https://api.geoapify.com/v1/geocode/autocomplete",
  search: "https://api.geoapify.com/v1/geocode/search",
  routing: "https://api.geoapify.com/v1/routing",
  places: "https://api.geoapify.com/v2/places",
};

exports.handler = async function (event) {
  const params = new URLSearchParams(event.queryStringParameters || {});
  const endpoint = params.get("endpoint");
  params.delete("endpoint");

  const target = ENDPOINTS[endpoint];
  if (!target) {
    return { statusCode: 400, body: JSON.stringify({ error: "invalid endpoint" }) };
  }
  if (!process.env.GEOAPIFY_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "GEOAPIFY_KEY not configured" }) };
  }

  params.set("apiKey", process.env.GEOAPIFY_KEY);

  try {
    const res = await fetch(`${target}?${params.toString()}`);
    const body = await res.text();
    return { statusCode: res.status, headers: { "Content-Type": "application/json" }, body };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: "upstream request failed" }) };
  }
};
