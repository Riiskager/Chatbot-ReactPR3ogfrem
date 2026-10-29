import { Form, Link, redirect, useActionData, useNavigation, useSearchParams } from "react-router";
import { supabase } from "../lib/supabase";

export async function clientAction({request}){
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if(!password || !email){
    return {error: "Fill in all form inputs"}
  }

  const {error} = await supabase.auth.signInWithPassword({ email, password });

  if(error){
    return{error: "Invalid email or password"};
  }
  console.log("Ingen fejl, før redirect")
  return redirect("/")
  
}

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in with your email and password</p>
        {justRegistered &&(
            <div className="success-message"> 
            Account created Successfully! Please Log in </div>
        )}

        <Form method="post" className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Your password"
            />
          </div>
        {actionData?.error && (
        <div className="error-message">{actionData.error}</div>
      )}
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Logging in..." :"Log in"}
          </button>
        </Form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
