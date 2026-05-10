const BASE_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`

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
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) throw new Error(`Airtable error ${res.status}`)
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
