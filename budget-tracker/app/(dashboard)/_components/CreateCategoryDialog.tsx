"use client"

import { TransactionType } from "@/lib/types"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {CreateCategorySchemaType, CreateCategorySchema} from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

interface Props {
    type: TransactionType;
};


const CreateCategoryDialog = ({type}: Props) => {

    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
      resolver: zodResolver(CreateCategorySchema),
      defaultValues: {
        type
      }
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex border-separate items-center justify-start rounded-none
        border-b px-3 py-3 text-muted-foreground">
          <PlusSquare className="mr-2 h-4 w-4"/>
          Create new
        </Button>
      </DialogTrigger>
      
    </Dialog>
  )
}

export default CreateCategoryDialog