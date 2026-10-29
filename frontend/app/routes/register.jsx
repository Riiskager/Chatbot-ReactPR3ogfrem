import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { supabase } from "../lib/supabase";

export async function clientAction({ request }) {
  // TODO: Hent formData fra request.
  const formData = await request.formData()
  // TODO: Hent email og password fra formData.
  const email = formData.get("email")
  const password = formData.get("password")
  const confirm = formData.get("confirmPassword")
  // TODO: Log email og password.
 

  // TODO: Opret brugeren med supabase.auth.signUp({ email, password }), og gem svaret i en variabel.


if(!email || !password || !confirm){
  return{error: "All fields are required"}
}

if(confirm !== password){
  return{error: "Passwords need to match"}
}
if(password.length < 6){
  return{error: "Password lenght requirement is 6"}
}

  const {error} = await supabase.auth.signUp({email, password})
if(error){
  return{error: error.message}
}
  return redirect("/login?registered=true");

}


export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Sign up with email and password</p>

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
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Re-enter your password"
            />
          </div>
        {actionData?.error && (
        <div className="error-message">{actionData.error}</div>
      )}

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </Form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
