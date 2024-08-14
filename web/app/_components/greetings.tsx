import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Session } from "next-auth";

interface GreetingsProps {
  session: Session | null
}

export function Greetings({ session }: GreetingsProps) {

  function getFormattedDate(): string {
    const now = new Date();
    
    // Format the day and month names
    const day = format(now, "EEE, dd", { locale: ptBR });
    const month = format(now, "MMMM", { locale: ptBR });
    
    // Capitalize the first letter of the day and month
    const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
  
    // Return the formatted string with "de" in lowercase
    return `${capitalize(day)} de ${capitalize(month)}`;
  }

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl">
        Olá,&nbsp;
        <span className="font-bold">{session?.user ? session.user.name : "Faça seu Login!"}</span>
      </h2>
      <p>
        <span>{ getFormattedDate() }</span>
      </p>
    </div>
  )
}