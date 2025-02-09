"use client";


import FilterBar from "@/components-library/FilterBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ✅ Définition du type pour les livres
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // ✅ Charger les données dynamiquement depuis `/public/books.json`
  useEffect(() => {
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Problème de chargement du fichier books.json");
        }
        return res.json();
      })
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Erreur lors du chargement des livres:", error));
  }, []);

  // ✅ Filtrage des livres par titre, auteur et catégorie
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
      (categoryFilter === "" || book.category.toLowerCase() === categoryFilter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue dans la bibliothèque</h1>

      {/* ✅ Passer les trois filtres */}
      <FilterBar
        setTitleFilter={setTitleFilter}
        setAuthorFilter={setAuthorFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md">
              {/* ✅ Utilisation de `next/image` pour les images */}
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">Auteur : {book.author}</p>
              <p className="text-gray-500">Catégorie : {book.category}</p>

              {/* ✅ Correction du lien */}
              <Link href={`/book/${book.id}`}>
                <span className="mt-2 block text-blue-500 underline">Découvrez ce livre</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun livre trouvé.</p>
      )}
    </div>
  );
}
