const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchBooks(token: string) {
  const res = await fetch(`${API_URL}/api/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener los libros');
  }

  return res.json();
}

export async function searchBooks(query: string, token: string) {
  const res = await fetch(`${API_URL}/api/books/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al buscar libros');
  return res.json();
}

// User Library Management
export async function getUserLibrary(token: string): Promise<any[]> {
  const res = await fetch(`${API_URL}/api/library`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener la biblioteca');
  }

  return res.json();
}

export async function addUserBook(payload: any, token: string) {
  const res = await fetch(`${API_URL}/api/library/${payload.bookId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    console.error("🚨 Error del backend al añadir libro:", res.status, errorDetails);
    throw new Error('Error al añadir libro a la biblioteca');
  }
  
  return res.json();
}

export async function createAndAddBook(bookData: any, token: string) {
  // First create the book globally
  const bookRes = await fetch(`${API_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(bookData)
  });
  if (!bookRes.ok) throw new Error('Error al crear el libro');
  const newBook = await bookRes.json();
  
  // Then add it to user library (this might be combined in backend, but keeping it explicit)
  return newBook;
}

export async function updateUserBook(progressId: number, updateData: { currentPage: number }, token: string) {
  const res = await fetch(`${API_URL}/api/library/${progressId}?page=${updateData.currentPage}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al actualizar el libro');
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
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener el usuario actual');
  }

  return res.json();
}

