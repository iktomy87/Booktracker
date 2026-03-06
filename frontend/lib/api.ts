const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchBooks(token: string) {
  const res = await fetch(`${API_URL}/api/books`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Aquí inyectamos el JWT
    },
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

export async function fetchCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Enviamos el JWT para autenticar la petición
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener el usuario actual');
  }

  return res.json();
}