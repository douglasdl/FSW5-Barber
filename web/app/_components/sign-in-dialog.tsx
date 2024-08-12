import Image from "next/image";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

export function SignInDialog() {

  async function handleLoginWithGoogleClick() {
    await signIn("google")
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button variant="outline" className="gap-2 font-bold" onClick={handleLoginWithGoogleClick}>
        <Image src="/google.svg" width={18} height={18} alt="Fazer login com Google" />
        Google
      </Button>
    </>
  )
}