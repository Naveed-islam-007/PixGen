"use client";
import { Check } from "lucide-react";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  FieldError,
  Description,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    console.log({ data, error });
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <Card className="border w-full max-w-md py-10 px-6 shadow-sm rounded-2xl">
        <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8)
                return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value))
                return "Password must contain at least one uppercase letter";
              if (!/[0-9]/.test(value))
                return "Password must contain at least one number";
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              At least 8 characters, 1 uppercase letter, and 1 number
            </Description>
            <FieldError />
          </TextField>

          <Button type="submit" className="flex items-center gap-1.5 w-full">
            <Check size={15} />
            Login
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Google */}
          <Button
            variant="bordered"
            className="w-full flex items-center gap-2"
            onPress={handleGoogleSignIn}
          >
           
            Continue with Google
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-zinc-900 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;