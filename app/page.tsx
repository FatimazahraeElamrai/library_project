"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FilterBar from "@/components-library/FilterBar";
import { useAuth } from "@/app/providers";
import AddBookModal from "@/components-library/AddBookModal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Guard from "@/components/Guard"; // ✅ Protection RBAC

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function Home() {
  return (
    <Guard allowedRoles={["admin", "reader"]}> {/* ✅ Protection des rôles */}
      <LibraryContent />
    </Guard>
  );
}

function LibraryContent() {
  const { user, setUser } = useAuth(); // ✅ Ajout de `setUser`
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    setUser(null); // ✅ Supprime l'utilisateur du contexte
    localStorage.removeItem("user"); // ✅ Supprime `user` du `localStorage`
    router.push("/login"); // ✅ Redirige immédiatement vers `/login`
  };

  // ✅ Charger les livres depuis `/public/books.json`
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data))
      .catch((error) => console.error("❌ Erreur lors du chargement des livres:", error));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenue dans la bibliothèque</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Déconnexion
        </Button>
      </div>

      {/* ✅ Afficher le bouton "Ajouter un livre" uniquement pour un admin */}
      {user?.role === "admin" && (
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
