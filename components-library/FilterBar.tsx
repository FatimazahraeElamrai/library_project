import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface FilterBarProps {
  setTitleFilter: (filter: string) => void;
  setAuthorFilter: (filter: string) => void;
  setCategoryFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setTitleFilter, setAuthorFilter, setCategoryFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* ✅ Champ de recherche pour filtrer par titre */}
      <Input
        placeholder="Rechercher par titre..."
        onChange={(e) => setTitleFilter(e.target.value)}
      />

      {/* ✅ Champ de recherche pour filtrer par auteur */}
      <Input
        placeholder="Rechercher par auteur..."
        onChange={(e) => setAuthorFilter(e.target.value)}
      />

      {/* ✅ Sélecteur de catégorie (fix complet du filtrage) */}
      <Select onValueChange={(value) => setCategoryFilter(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrer par catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem> {/* ✅ Correction ici */}
          <SelectItem value="fiction">Fiction</SelectItem>
          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="juridique">Juridique</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
