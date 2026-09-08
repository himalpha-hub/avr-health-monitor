export async function getBackendHealth() {
  const response = await fetch(
    "http://127.0.0.1:8000/health"
  );

  if (!response.ok) {
    throw new Error(
      "Health API failed"
    );
  }

  return response.json();
}