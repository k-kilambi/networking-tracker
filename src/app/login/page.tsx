import { logIn } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <AuthForm
      title="Log in"
      submitLabel="Log in"
      action={logIn}
      switchText="New here?"
      switchHref="/signup"
      switchLabel="Create an account"
    />
  );
}
