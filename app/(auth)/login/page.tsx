"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema as never) as Resolver<LoginFormValues>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(values: LoginFormValues) {
    // TODO(Rasel): replace with real Auth context/API call
    // const { data, error } = await authClient.signIn.email({
    //   email: values.email,
    //   password: values.password,
    //   rememberMe: true,
    //   callbackURL: "/listings/manage",
    // });
    // if (data) {
    //   toast.success("Successfully logged in!");
    // }
    toast.success("Demo login ready");
    console.log(values);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[2rem] font-semibold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to manage your listings or contact farmers.
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Button type="submit" className="w-full h-12 text-base">
              Sign In
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="h-px bg-border flex-1"></span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              or
            </span>
            <span className="h-px bg-border flex-1"></span>
          </div>

          <GoogleLoginButton className="mt-4" />
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-primary font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
