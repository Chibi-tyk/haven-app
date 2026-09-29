import type { Listing } from './types'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
export async function fetchListings(params: URLSearchParams) {
  try {
    const response = await fetch(`${API}/listings?${params.toString()}`)
    if (!response.ok) throw new Error('Could not load listings')
    return (await response.json()).data as Listing[]
  } catch { return null }
}
export async function fetchListing(id: string) {
  try { const r = await fetch(`${API}/listings/${id}`); return r.ok ? (await r.json()).data as Listing : null } catch { return null }
}
export async function signIn(email: string, password: string) {
  const r = await fetch(`${API}/auth/login`, { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) })
  const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Could not sign in'); return data.data
}
export async function signUp(displayName: string, email: string, password: string) {
  const r = await fetch(`${API}/auth/register`, { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify({displayName,email,password}) })
  const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Could not create account'); return data.data
}
export async function createListing(input: Record<string, unknown>) {
  const r = await fetch(`${API}/listings`, { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(input) })
  const data = await r.json(); if (!r.ok) throw new Error(data.error || 'Could not save listing'); return data.data as Listing
}
export async function currentAccount() {
  const r=await fetch(`${API}/auth/me`,{credentials:'include'});if(!r.ok)return null;return (await r.json()).data as {id:string;email:string;display_name:string;displayName?:string;role:'member'|'admin'}
}
export async function myListings() {
  const r=await fetch(`${API}/listings/mine`,{credentials:'include'});if(!r.ok)throw new Error('Sign in to see your listings');return (await r.json()).data as Listing[]
}
export async function updateListing(id:string,input:Record<string,unknown>) {
  const r=await fetch(`${API}/listings/${id}`,{method:'PATCH',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(input)});const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not update listing');return data.data as Listing
}
export async function deleteListing(id:string) {
  const r=await fetch(`${API}/listings/${id}`,{method:'DELETE',credentials:'include'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not delete listing')
}
export async function signOut() { await fetch(`${API}/auth/logout`,{method:'POST',credentials:'include'}) }
export async function adminListings() { const r=await fetch(`${API}/admin/listings`,{credentials:'include'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Administrator access required');return data.data as Listing[] }
export async function moderateListing(id:string,decision:'approve'|'reject') { const r=await fetch(`${API}/admin/listings/${id}`,{method:'PATCH',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({decision})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not update listing');return data.data as Listing }
export async function adminDeleteListing(id:string) { const r=await fetch(`${API}/admin/listings/${id}`,{method:'DELETE',credentials:'include'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not delete listing') }
