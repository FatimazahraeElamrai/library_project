import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ReviewForm: React.FC = () => {
  // Initialisation du formulaire
  const form = useForm({
    defaultValues: {
      name: "",
      review: "",
    },
  });

  // Gestion de la soumission du formulaire
  const onSubmit = (values: { name: string; review: string }) => {
    console.log("Données du formulaire :", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Votre nom" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Critique</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Votre avis sur le livre" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
