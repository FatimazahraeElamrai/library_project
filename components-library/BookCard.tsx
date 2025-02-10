import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  image: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, image }) => {
  return (
    <Card className="w-80 shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image src={image} alt={title} width={150} height={200} className="rounded-lg" />
      </CardContent>
      <CardFooter className="text-sm text-gray-600">📚 Découvrez ce livre</CardFooter>
    </Card>
  );
};

export default BookCard;