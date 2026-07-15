"use client";

import { useState, useRef } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitListing } from "@/lib/api";
import { UploadCloud, X, Loader2 } from "lucide-react";

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
    .number({ message: "Price must be a number." })
    .min(1, { message: "Price must be greater than 0." }),
  location: z.string().min(3, { message: "Location is required." }),
  imageUrl: z.string().url({ message: "A valid image upload is required." }), // Schema now strictly validates public URL
});

type ListingFormValues = z.infer<typeof formSchema>;

export default function AddListingPageClient() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      imageUrl: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  // Handles uploading the file directly to ImgBB
  const uploadToImgBB = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);

      // Temporary local preview while uploading (UX optimization)
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (result.success && result.data?.url) {
        const remoteUrl = result.data.url;
        setImagePreview(remoteUrl); // Switch to production URL
        setValue("imageUrl", remoteUrl, { shouldValidate: true });
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      setImagePreview(null);
      setValue("imageUrl", "", { shouldValidate: true });
      toast.error("Failed to upload image to ImgBB. Please try again.");
      console.error("ImgBB Upload Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadToImgBB(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadToImgBB(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("imageUrl", "", { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function onSubmit(values: ListingFormValues) {
    const response = await submitListing(values);

    if (response.success) {
      toast.success("Listing published successfully!");
      form.reset();
      setImagePreview(null);
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
        {/* Dynamic Drag-and-Drop + ImgBB Status Area */}
        <Field data-invalid={!!errors.imageUrl}>
          <FieldLabel>Listing Banner Image</FieldLabel>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() =>
              !imagePreview && !isUploading && fileInputRef.current?.click()
            }
            className={`relative min-h-[200px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 transition-colors duration-200 ${
              isDragging
                ? "border-primary bg-secondary/10"
                : "border-muted-foreground/20"
            } ${!imagePreview && !isUploading ? "hover:border-primary/50 cursor-pointer" : ""} ${
              imagePreview && !isUploading
                ? "border-solid p-0 overflow-hidden"
                : ""
            }`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />

            {isUploading ? (
              <div className="text-center flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm font-semibold text-foreground">
                  Uploading to CDN...
                </p>
                <p className="text-xs text-muted-foreground">
                  Your image is being processed securely.
                </p>
              </div>
            ) : imagePreview ? (
              <div className="relative w-full h-[220px] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Listing Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-3 right-3 bg-destructive text-destructive-foreground p-2 rounded-full shadow hover:bg-destructive/90 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mb-4">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Click to upload or drag image here
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, or WEBP up to 5MB
                </p>
              </div>
            )}
          </div>
          <FieldError>{errors.imageUrl?.message}</FieldError>
        </Field>

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

        <Button
          type="submit"
          className="w-full h-12 text-base mt-4"
          disabled={isUploading}>
          {isUploading ? "Uploading Image..." : "Publish Listing"}
        </Button>
      </form>
    </div>
  );
}
