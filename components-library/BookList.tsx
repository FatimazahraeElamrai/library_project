import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import BookCard from "./BookCard";

interface Book {
  title: string;
  author: string;
  category?: string; // ✅ Permettre `undefined` pour éviter les erreurs
  image: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Auteur</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Couverture</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, index) => (
          <TableRow key={index}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.category ? book.category : "Non spécifié"}</TableCell>
            <TableCell>
              <BookCard title={book.title} author={book.author} image={book.image} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookList;
