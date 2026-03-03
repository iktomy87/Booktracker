const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/api/books`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Error al obtener los libros');
  }

  return res.json();
}

export async function register(userData: any) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en el registro');
  }

  return res.json();
}