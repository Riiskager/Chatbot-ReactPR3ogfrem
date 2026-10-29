import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { supabase } from "../lib/supabase";

export async function clientAction({request}){
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if(!password || !email){
    return {error: "Fill in all form inputs"}
  }

  const {login} = supabase.auth.signInWithPassword({ email, password })
  if(!login){
    return{error: "Invalid email or password"};
  }else{
    redirect("/")
  }
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in with your email and password</p>

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
          <button type="submit" className="btn-primary">
            Log In
          </button>
        </Form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
