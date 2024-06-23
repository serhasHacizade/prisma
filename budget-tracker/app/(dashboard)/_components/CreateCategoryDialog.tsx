"use client"

import { TransactionType } from "@/lib/types"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { CreateCategorySchemaType, CreateCategorySchema } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleOff, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface Props {
  type: TransactionType;
};


const CreateCategoryDialog = ({ type }: Props) => {

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
          <PlusSquare className="mr-2 h-4 w-4" />
          Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create <span className={cn("m-1", type === "income" ? "bg-emerald-500" : "text-red-500")}>
            {type}
          </span> category</DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input defaultValue={""} {...field} />
                </FormControl>
                <FormDescription>Transaction description (optional)</FormDescription>
              </FormItem>
            )} />
            <FormField control={form.control} name="icon" render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-[100px] w-full">
                        {form.watch("icon") ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl" role="img">{field.value}</span>
                            <p className="text-xs text-muted-foreground">Change</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <CircleOff className="h-[48px] w-[48px]" />
                            <p className="text-xs text-muted-foreground">Click to select</p>
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Picker data={data} onEmojiSelect={(emoji: { native: string; }) => {
                        field.onChange(emoji.native)
                      }}></Picker>
                    </PopoverContent>
                  </Popover>

                </FormControl>
                <FormDescription>This is how your category will appear in the app</FormDescription>
              </FormItem>
            )} />
          </form>
        </Form>
      </DialogContent>

    </Dialog>
  )
}

export default CreateCategoryDialog