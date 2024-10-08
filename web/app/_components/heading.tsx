interface HeadingProps {
  title: string
}

export function Heading({ title }: HeadingProps) {
  return (
    <h2 className="uppercase text-xs font-bold text-gray-400 my-3">{title}</h2>
  )
}