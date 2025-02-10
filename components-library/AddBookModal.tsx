"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
};

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

export default function AddBookModal({ isOpen, onClose, onSave }: AddBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!title || !author || !category || !image) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      category,
      image: image.startsWith("http") ? image : "https://via.placeholder.com/300x200.png",
    };

    onSave(newBook);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un livre 📚</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
            Ajouter ✅
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
