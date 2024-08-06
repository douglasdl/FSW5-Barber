import { Card, CardContent } from "./ui/card";

export function Footer() {
  return (
    <footer>
      <Card className="rounded-none border-none">
        <CardContent className="py-6 px-5">
          <p className="text-sm text-gray-400">
            © 2024 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}