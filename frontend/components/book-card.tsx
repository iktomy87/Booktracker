import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"


export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  author: string
  coverUrl: string
  rating: number
}

export function BookCard({ 
  title, 
  author, 
  coverUrl, 
  rating, 
  className, 
  ...props 
}: BookCardProps) {
  return (
    <div className={cn("flex w-[150px] flex-col gap-3 flex-shrink-0", className)} {...props}>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-sm transition-all hover:shadow-md">
        <Image
          src={coverUrl}
          alt={`Portada de ${title}`}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 150px, 200px"
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-tight text-[#4a4035] line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="text-xs text-[#8c8070] line-clamp-1">{author}</p>
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-[#d4c8b4] text-[#d4c8b4]" />
          <span className="text-xs font-medium text-[#6b5d4d]">{rating}</span>
        </div>
      </div>
    </div>
  )
}
