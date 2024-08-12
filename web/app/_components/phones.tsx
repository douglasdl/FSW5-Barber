import { PhoneItem } from "./phone-item"

interface PhonesProps {
  phones: string[]
}

export function Phones ({ phones }: PhonesProps) {
  return (
    <div className="space-y-3">
      {
        phones.map((phone, index) => (
          <PhoneItem 
            key={`${index}-${phone}`}
            phone={phone}
          />
        ))
      }
    </div>
  )
}