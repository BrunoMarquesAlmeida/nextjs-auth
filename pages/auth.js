import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        Router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
