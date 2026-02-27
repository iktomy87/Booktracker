const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/api/books`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Error al obtener los libros');
  }

  return res.json();
}