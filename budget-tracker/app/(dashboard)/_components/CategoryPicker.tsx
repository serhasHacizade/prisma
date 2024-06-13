"use client"

import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { TransactionType } from '@/lib/types'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

interface Props {
    type: TransactionType
}

const CategoryPicker = ({ type }: Props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`).then(res => res.json())
    });

    const selectedCategory = categoriesQuery.data?.find((category: Category) => category.name === value);

    return (
        
        <Popover open={open} onOpenChange={setOpen}>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[]"></Button>
        </Popover>
    )
}

export default CategoryPicker