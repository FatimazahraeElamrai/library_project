"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // ✅ Charger certains composants dynamiquement
import { useAuth } from "@/app/providers";
import AddBookModal from "@/components-library/AddBookModal";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Guard from "@/components/Guard"; 
import { LogOut } from "lucide-react";

// ✅ Charger FilterBar dynamiquement pour éviter le SSR
const FilterBar = dynamic(() => import("@/components-library/FilterBar"), { ssr: false });

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function Home() {
  return (
    <Guard allowedRoles={["admin", "reader"]}>
      <LibraryContent />
    </Guard>
  );
}

function LibraryContent() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // États pour les filtres
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ✅ Désactiver complètement le SSR au premier rendu
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Charger les livres uniquement après le montage client
  useEffect(() => {
    if (isClient) {
      fetch("/books.json")
        .then((res) => res.json())
        .then((data: Book[]) => {
          setBooks(data);
          setFilteredBooks(data);
        })
        .catch((error) => console.error("❌ Erreur lors du chargement des livres:", error));
    }
  }, [isClient]);

  // ✅ Appliquer les filtres dynamiquement
  useEffect(() => {
    if (books.length > 0) {
      let filtered = books.filter((book) => {
        const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase());
        const matchesCategory = categoryFilter === "all" || book.category.toLowerCase() === categoryFilter.toLowerCase();
        
        return matchesTitle && matchesAuthor && matchesCategory;
      });

      setFilteredBooks(filtered);
    }
  }, [titleFilter, authorFilter, categoryFilter, books]);

  // ✅ Empêcher l'affichage tant que le client n'est pas prêt (évite l'hydratation incorrecte)
  if (!isClient) return <p className="text-center">Chargement...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenue dans la bibliothèque</h1>
        <button 
          onClick={() => {
            setUser(null);
            if (typeof window !== "undefined") localStorage.removeItem("user");
            router.push("/login");
          }} 
          className="text-3xl text-gray-700 hover:text-red-500 transition">
          <LogOut size={24} />
        </button>
      </div>

      {user?.role === "admin" && (
        <Button onClick={() => setIsModalOpen(true)} className="mb-4 bg-green-500 hover:bg-green-600">
          + Ajouter un livre 📚
        </Button>
      )}

      {/* ✅ Correction du filtrage dynamique */}
      <FilterBar 
        setTitleFilter={setTitleFilter} 
        setAuthorFilter={setAuthorFilter} 
        setCategoryFilter={setCategoryFilter} 
      />

      {isModalOpen && <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={(newBook: Book) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setIsModalOpen(false);
      }} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
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
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">📚 Aucun livre trouvé...</p>
        )}
      </div>
    </div>
  );
}
