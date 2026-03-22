import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { BookCover } from "@/components/add-book/book-cover" 

export interface BookCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  author: string
  coverUrl?: string | null 
  coverVariant?: string   
  rating: number
}

export function BookCard({ 
  title, 
  author, 
  rating,
  coverUrl, 
  coverVariant = "cv1", 
  className, 
  ...props 
}: BookCardProps) {
  return (
    <div className={cn("flex w-[150px] flex-col gap-3 flex-shrink-0", className)} {...props}>
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md shadow-sm transition-all hover:shadow-md">
        
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Portada de ${title}`}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 150px, 200px"
          />
        ) : (
          <BookCover 
            title={title} 
            variant={coverVariant} 
            size="xl" 
            className="h-full w-full !rounded-none transition-transform hover:scale-105" 
          />
        )}

      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-tight text-[#4a4035] line-clamp-1" title={title}>
          {title}
        </h3>
        <p className="text-xs text-[#8c8070] line-clamp-1">{author}</p>
      </div>
    </div>
  )
}