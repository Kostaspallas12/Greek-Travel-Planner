const ENDPOINTS = {
  autocomplete: { url: "https://api.geoapify.com/v1/geocode/autocomplete", params: ["text", "filter", "format", "limit", "lang"] },
  search: { url: "https://api.geoapify.com/v1/geocode/search", params: ["text", "filter", "format", "limit", "lang"] },
  routing: { url: "https://api.geoapify.com/v1/routing", params: ["waypoints", "mode", "format", "lang", "avoid"] },
  places: { url: "https://api.geoapify.com/v2/places", params: ["categories", "filter", "bias", "limit", "lang"] },
};

const MAX_VALUE_LENGTH = 300;
const MAX_LIMIT = 100;
const MAX_WAYPOINTS = 12;

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

// Προωθούμε μόνο όσα στέλνει η εφαρμογή, για να μη χρησιμοποιείται το κλειδί μας για άλλα αιτήματα.
function buildParams(target, incoming) {
  const params = new URLSearchParams();
  for (const name of target.params) {
    const value = incoming.get(name);
    if (value === null) continue;
    if (value.length > MAX_VALUE_LENGTH) return null;
    params.set(name, value);
  }
  const limit = params.get("limit");
  if (limit !== null && !(Number(limit) >= 1 && Number(limit) <= MAX_LIMIT)) return null;
  const waypoints = params.get("waypoints");
  if (waypoints !== null && waypoints.split("|").length > MAX_WAYPOINTS) return null;
  return params;
}

export default async (req) => {
  if (req.method !== "GET") return json(405, { error: "method not allowed" });

  const incoming = new URL(req.url).searchParams;
  const target = Object.hasOwn(ENDPOINTS, incoming.get("endpoint")) ? ENDPOINTS[incoming.get("endpoint")] : null;
  if (!target) return json(400, { error: "invalid endpoint" });

  const params = buildParams(target, incoming);
  if (!params) return json(400, { error: "invalid parameters" });
  if (!process.env.GEOAPIFY_KEY) return json(500, { error: "GEOAPIFY_KEY not configured" });

  params.set("apiKey", process.env.GEOAPIFY_KEY);

  try {
    const res = await fetch(`${target.url}?${params.toString()}`);
    return new Response(await res.text(), { status: res.status, headers: { "Content-Type": "application/json" } });
  } catch {
    return json(502, { error: "upstream request failed" });
  }
};

export const config = {
  path: "/api/geoapify",
  rateLimit: {
    windowLimit: 120,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
