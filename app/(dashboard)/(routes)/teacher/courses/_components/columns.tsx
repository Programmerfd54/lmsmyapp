"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"
import { cn } from "@/lib/utils"


import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({column}) => {
      return(
        <Button
         variant="ghost"
         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return(
        <Button
         variant="ghost"
         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("ru-RU",{
        style: "currency",
        currency: "RUB"
      }).format(price);
      
      return(
        <div>{formatted}</div>
      )

   }
  },
  {
    accessorKey: "isPublished",
    header: ({column}) => {
      return(
        <Button
         variant="ghost"
         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isPublished
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const isPublished = row.getValue("isPublished") || false;
    
      return(
          <Badge className={cn(
            "bg-slate-500",
            isPublished && "bg-sky-700"
          )}>
            {isPublished ? "Опубликовано" : "Черновик"}
          </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) =>{
      const { id } = row.original;

      return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
