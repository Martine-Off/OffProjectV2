const BASE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`

console.log('[airtable] token:', import.meta.env.VITE_AIRTABLE_TOKEN)
console.log('[airtable] base:', import.meta.env.VITE_AIRTABLE_BASE_ID)

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
}

export async function fetchRecords(table, params = {}) {
  const url = new URL(`${BASE_URL}/${encodeURIComponent(table)}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString(), { headers })
  if (!res.ok) throw new Error(`Airtable error ${res.status}`)
  return res.json()
}

export async function createRecord(table, fields) {
  const body = { fields }
  console.log('[airtable] createRecord →', JSON.stringify(body, null, 2))
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const errBody = await res.json().catch(() => null)
    console.log('[airtable] erreur detail:', JSON.stringify(errBody, null, 2))
    throw new Error(`Airtable error ${res.status}`)
  }
  return res.json()
}

export async function updateRecord(table, recordId, fields) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) throw new Error(`Airtable error ${res.status}`)
  return res.json()
}

export async function deleteRecord(table, recordId) {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: 'DELETE',
    headers,
  })
  if (!res.ok) throw new Error(`Airtable error ${res.status}`)
  return res.json()
}
