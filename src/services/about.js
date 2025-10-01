// src/services/about.js
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;        // örn: https://your-strapi.com
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;    // Read-only token

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

/** About single type verisini getirir (populate=*) */
export async function getAbout() {
  const url = `${STRAPI_URL}/api/about?populate=*`;
  const json = await fetchJson(url);

  // Kullanışlı bir shape’a dönüştürelim (UI’da işimiz kolay olsun)
  const data = json?.data?.attributes || {};
  const imageUrl =
    data?.image?.data?.attributes?.url
      ? (data.image.data.attributes.url.startsWith("http")
          ? data.image.data.attributes.url
          : `${STRAPI_URL}${data.image.data.attributes.url}`)
      : null;

  return {
    heading: data.heading || "",
    content: data.content || "",
    imageUrl,
    stats: Array.isArray(data.stats) ? data.stats.map(s => ({
      label: s?.label ?? "",
      value: s?.value ?? "",
    })) : [],
    raw: json, // İstersen debug için
  };
}
