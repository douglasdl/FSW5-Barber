"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {

  function handleCopyPhoneClick(phone: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone).then(() => {
        toast.success("Telefone copiado com sucesso!");
      }).catch(err => {
        toast.error("Falha ao copiar telefone.");
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback method
      const textarea = document.createElement('textarea');
      textarea.value = phone;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success("Telefone copiado com sucesso!");
      } catch (err) {
        toast.error("Falha ao copiar telefone.");
        console.error('Failed to copy text using fallback: ', err);
      }
      document.body.removeChild(textarea);
    }
  }
    
  return (
    <div key={phone} className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon  />
        <p className="text-sm">{phone}</p>
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}