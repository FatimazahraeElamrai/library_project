"use client";

import BookList from "@/components-library/BookList";
import ReviewForm from "@/components-library/ReviewForm";
import FilterBar from "@/components-library/FilterBar";
import { useState, useEffect } from "react";

// ✅ Définition du type pour les livres
interface Book {
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // ✅ Gère "all"

  // ✅ Charger les données dynamiquement depuis `/public/books.json`
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("Erreur lors du chargement des livres:", error));
  }, []);

  // ✅ Filtrage des livres par titre, auteur et catégorie
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
      (categoryFilter === "" || book.category.toLowerCase() === categoryFilter.toLowerCase()) // ✅ Gère bien "all"
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
        <BookList books={filteredBooks} />
      ) : (
        <p className="text-gray-500">Aucun livre trouvé.</p>
      )}

      <hr className="my-6" />
      <ReviewForm />
    </div>
  );
}
