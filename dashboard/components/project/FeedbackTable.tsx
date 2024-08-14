'use client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeedbackTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function FeedbackTable<TData, TValue>({ columns, data } : FeedbackTableProps<TData, TValue>){
    const [pageIndex, setPageIndex] = useState(0);  // Default to the first page
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    })

    // Function to navigate to the next page
const handleNextPage = () => {
    if (table.getCanNextPage()) {
        setPageIndex(current => current + 1);
    }
};

// Function to navigate to the previous page
const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
        setPageIndex(current => Math.max(0, current - 1));
    }
};

// Handling changes in page size
const handlePageSizeChange = (newSize: number) => {
    console.log('updating page size', newSize);
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page on page size change
};

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {
                        table?.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder ?
                                                    null :
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table?.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow 
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {
                                        row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        }
                                        )
                                    }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No feedback submitted.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4">
            <div className="space-x-2">
                <Button variant={'ghost'} onClick={handlePreviousPage} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className='w-4 h-4' />
                </Button>
                <Button variant={'ghost'} onClick={handleNextPage} disabled={!table.getCanNextPage()}>
                    <ChevronRight className='w-4 h-4' />
                </Button>
            </div>
            <Select
                onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                    {[5, 10, 20, 30, 40, 50].map(size => (
                        <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        </div>
    )
}