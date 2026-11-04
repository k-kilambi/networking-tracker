import { signUp } from "@/app/actions";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <AuthForm
      title="Create your account"
      submitLabel="Sign up"
      action={signUp}
      switchText="Already have an account?"
      switchHref="/login"
      switchLabel="Log in"
    />
  );
}
