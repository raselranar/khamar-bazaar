"use client";

import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitListing } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  shortDescription: z
    .string()
    .min(10, { message: "Short description is required." }),
  fullDescription: z
    .string()
    .min(20, { message: "Full description is required." }),
  breed: z.string().min(2, { message: "Breed or type is required." }),
  category: z.enum(["Duck", "Chicken", "Goat", "Egg", "Cow"]),
  price: z
    .number({ error: "Price must be a number." })
    .min(1, { message: "Price must be greater than 0." }),
  location: z.string().min(3, { message: "Location is required." }),
});

type ListingFormValues = z.infer<typeof formSchema>;

export default function AddListingPageClient() {
  const form = useForm<ListingFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema as any) as Resolver<ListingFormValues>,
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      breed: "",
      category: "Duck",
      price: 0,
      location: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: ListingFormValues) {
    const response = await submitListing(values);

    if (response.success) {
      toast.success("Listing published successfully!");
      form.reset();
    } else {
      toast.error("Failed to publish listing.");
    }
  }

  return (
    <div className="container mx-auto px-6 max-w-2xl py-16">
      <h1 className="text-3xl font-semibold mb-2">Add New Listing</h1>
      <p className="text-muted-foreground mb-8">
        Fill out the details below to list your livestock or produce.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            placeholder="e.g. Muscovy Duckling - 2 weeks"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field data-invalid={!!errors.category}>
            <FieldLabel>Category</FieldLabel>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger aria-invalid={!!errors.category}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Duck">Duck</SelectItem>
                    <SelectItem value="Chicken">Chicken</SelectItem>
                    <SelectItem value="Egg">Egg</SelectItem>
                    <SelectItem value="Goat">Goat</SelectItem>
                    <SelectItem value="Cow">Cow</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.category?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.price}>
            <FieldLabel htmlFor="price">Price (BDT)</FieldLabel>
            <Input
              id="price"
              type="number"
              placeholder="0"
              aria-invalid={!!errors.price}
              {...register("price", { valueAsNumber: true })}
            />
            <FieldError>{errors.price?.message}</FieldError>
          </Field>
        </div>

        <Field data-invalid={!!errors.location}>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            placeholder="e.g. Bochaganj, Rangpur"
            aria-invalid={!!errors.location}
            {...register("location")}
          />
          <FieldError>{errors.location?.message}</FieldError>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field data-invalid={!!errors.breed}>
            <FieldLabel htmlFor="breed">Breed / Type</FieldLabel>
            <Input
              id="breed"
              placeholder="e.g. Muscovy"
              aria-invalid={!!errors.breed}
              {...register("breed")}
            />
            <FieldError>{errors.breed?.message}</FieldError>
          </Field>

          <Field data-invalid={!!errors.fullDescription}>
            <FieldLabel htmlFor="fullDescription">Full Description</FieldLabel>
            <Textarea
              id="fullDescription"
              placeholder="Describe health, feeding, vaccinations, and quantity available..."
              className="resize-none h-24"
              aria-invalid={!!errors.fullDescription}
              {...register("fullDescription")}
            />
            <FieldError>{errors.fullDescription?.message}</FieldError>
          </Field>
        </div>

        <Field data-invalid={!!errors.shortDescription}>
          <FieldLabel htmlFor="shortDescription">Short Description</FieldLabel>
          <Textarea
            id="shortDescription"
            placeholder="Briefly describe the health, breed, and quality..."
            className="resize-none h-24"
            aria-invalid={!!errors.shortDescription}
            {...register("shortDescription")}
          />
          <FieldError>{errors.shortDescription?.message}</FieldError>
        </Field>

        <Button type="submit" className="w-full h-12 text-base mt-4">
          Publish Listing
        </Button>
      </form>
    </div>
  );
}
