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
import { useRouter } from "next/navigation"; // ✅ fixed

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    console.log({ data, error });

    if (!error) {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // ✅ redirects here after Google auth
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <Card className="border w-full max-w-md py-10 px-6 shadow-sm rounded-2xl">
        <h1 className="text-center text-2xl font-bold mb-6">Create Account</h1>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image" type="url">
            <Label>Profile Image URL</Label>
            <Input placeholder="https://example.com/avatar.jpg" />
            <FieldError />
          </TextField>

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

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex items-center gap-1.5">
              <Check size={15} />
              Submit
            </Button>
            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* ✅ Google sign-in wired to authClient */}
          <Button
            variant="bordered"
            className="w-full flex items-center gap-2"
            onPress={handleGoogleSignIn}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;