"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/components-library/ReviewForm";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function BookDetail() {
  const params = useParams(); // ✅ Récupère l'ID du livre dans l'URL
  const [book, setBook] = useState<Book | null>(null);

  // ✅ Charger les données depuis `books.json`
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => {
        const selectedBook = data.find((b) => b.id === Number(params.id));
        setBook(selectedBook || null);
      })
      .catch((error) => console.error("Erreur lors du chargement des livres:", error));
  }, [params.id]);

  if (!book) {
    return <p className="text-gray-500">Livre non trouvé.</p>;
  }

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <img src={book.image} alt={book.title} className="w-48 h-64 object-cover rounded-md shadow" />
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-600">Auteur : {book.author}</p>
          <p className="text-gray-500">Catégorie : {book.category}</p>
        </div>
      </div>

      <hr className="my-6" />

      {/* ✅ Formulaire pour soumettre une critique */}
      <h2 className="text-xl font-bold mb-4">Donnez votre avis</h2>
      <ReviewForm />
    </div>
  );
}
