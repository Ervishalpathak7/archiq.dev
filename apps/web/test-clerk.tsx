import * as React from "react";
import { renderToString } from "react-dom/server";
import { ClerkProvider, useSignIn, useSignUp, useClerk } from "@clerk/react";

function TestComponent() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const clerk = useClerk();

  const signInKeys = signIn ? Object.keys(Object.getPrototypeOf(signIn)).concat(Object.keys(signIn)) : [];
  const signUpKeys = signUp ? Object.keys(Object.getPrototypeOf(signUp)).concat(Object.keys(signUp)) : [];
  
  // also check if emailAddress exists on verifications
  const emailVerifications = signUp?.verifications?.emailAddress ? Object.keys(Object.getPrototypeOf(signUp.verifications.emailAddress)).concat(Object.keys(signUp.verifications.emailAddress)) : [];

  console.log("=== SIGN IN KEYS ===");
  console.log(signInKeys.filter(k => typeof (signIn as any)[k] === 'function'));
  
  console.log("=== SIGN UP KEYS ===");
  console.log(signUpKeys.filter(k => typeof (signUp as any)[k] === 'function'));

  console.log("=== SIGN UP VERIFICATIONS EMAIL KEYS ===");
  console.log(emailVerifications.filter(k => typeof (signUp?.verifications?.emailAddress as any)[k] === 'function'));

  console.log("=== CLERK KEYS ===");
  console.log(Object.keys(Object.getPrototypeOf(clerk)).concat(Object.keys(clerk)).filter(k => typeof (clerk as any)[k] === 'function'));

  return <div>Test</div>;
}

function App() {
  return (
    <ClerkProvider publishableKey="pk_test_dXNlZnVsLWJsb3dmaXNoLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ">
      <TestComponent />
    </ClerkProvider>
  );
}

renderToString(<App />);
