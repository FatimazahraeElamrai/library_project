"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "@/components-library/ReviewForm";
import Image from "next/image";
import Link from "next/link";

// Définition du type pour un livre
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function BookDetail() {
  const params = useParams(); // Récupère l'ID du livre dans l'URL
  const bookId = Number(params.id); // Convertir en nombre
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis `books.json`
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => {
        const selectedBook = data.find((b) => b.id === bookId);
        setBook(selectedBook || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des livres:", error);
        setLoading(false);
      });
  }, [bookId]);

  // Gestion du chargement
  if (loading) {
    return <p className="text-gray-500">Chargement...</p>;
  }

  // Gestion d'une erreur si le livre n'existe pas
  if (!book) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Livre non trouvé</h1>
        <p className="text-gray-600">Désolé, ce livre n'existe pas.</p>
        <Link href="/" className="mt-4 text-blue-500 underline">
          Retour à la bibliothèque
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image du livre */}
        <Image
          src={book.image}
          alt={book.title}
          width={300}
          height={400}
          className="rounded-md shadow-md"
        />

        {/* Infos du livre */}
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600 text-lg">Auteur : {book.author}</p>
          <p className="text-gray-500">Catégorie : {book.category}</p>
        </div>
      </div>

      <hr className="my-6" />

      {/* Formulaire pour ajouter une critique */}
      <h2 className="text-xl font-bold mb-4">Donnez votre avis</h2>
      <ReviewForm />
    </div>
  );
}
