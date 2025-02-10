import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BookCard from "./BookCard";

interface Book {
  title: string;
  author: string;
  image: string;
  category?: string; // ✅ Permettre `undefined` pour éviter les erreurs
}

interface BookModalProps {
  book: Book;
}

const BookModal: React.FC<BookModalProps> = ({ book }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline">Voir les détails</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{book.title}</DialogTitle>
        <DialogDescription className="text-gray-600">{book.author}</DialogDescription>

        <BookCard title={book.title} author={book.author} image={book.image} />

        {/* ✅ Vérifier si la catégorie existe avant de l'afficher */}
        {book.category && (
          <p className="mt-4 text-sm text-gray-500"><strong>Catégorie :</strong> {book.category}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;