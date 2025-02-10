"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/components-library/FilterBar";
import { useAuth } from "@/app/providers";
import AddBookModal from "@/components-library/AddBookModal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Erreur lors du chargement des livres:", error));
  }, []);

  const handleAddBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue dans la bibliothèque</h1>

      {user.role === "admin" && (
        <Button onClick={() => setIsModalOpen(true)} className="mb-4 bg-green-500 hover:bg-green-600">
          + Ajouter un livre 📚
        </Button>
      )}

      <FilterBar />

      {isModalOpen && <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddBook} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={book.image || "https://via.placeholder.com/300x200.png?text=Pas+d'image"}
              alt={book.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-gray-600">Auteur : {book.author}</p>
            <p className="text-gray-500">Catégorie : {book.category}</p>
            <Link href={`/book/${book.id}`}>
              <span className="mt-2 block text-blue-500 underline">Découvrez ce livre</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
