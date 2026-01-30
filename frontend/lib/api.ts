/**
 * Client for the mental coach chat API.
 * Uses NEXT_PUBLIC_API_URL (e.g. http://localhost:8000) so it works locally and on Vercel.
 * Base URL is normalized (no trailing slash) to avoid double slashes that cause redirects and CORS preflight failures.
 */
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");


export type ChatResponse = { reply: string };

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Request failed");
  }

  return res.json();
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
}
