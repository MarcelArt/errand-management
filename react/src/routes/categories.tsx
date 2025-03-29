import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createFileRoute } from '@tanstack/react-router';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoryApi from '@/api/category.api';
import CreateCategoryModal from '@/components/create-category-modal';
import DeleteConfirmModal from '@/components/delete-confirm-modal';
import { useState } from 'react';
import { toast } from 'sonner';
import UpdateCategoryModal from '@/components/update-category-modal';

export const Route = createFileRoute('/categories')({
	component: RouteComponent,
});

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="m-4">
			<h1 className="text-2xl mx-2 my-4">Category</h1>
			<CreateCategoryModal />
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					Previous
				</Button>
				<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					Next
				</Button>
			</div>
		</div>
	);
}

const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'ID',
		header: 'ID',
	},
	{
		accessorKey: 'value',
		header: 'Category',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const category = row.original;

			const queryClient = useQueryClient();

			const [isDeleteOpen, setIsDeleteOpen] = useState(false);
			const [isUpdateOpen, setIsUpdateOpen] = useState(false);

			const { mutate } = useMutation({
				mutationFn: () => categoryApi.remove(category.ID),
				onSuccess: () => {
					toast('Category has been deleted.');
					queryClient.invalidateQueries({ queryKey: ['categories'] });
				}
			});

			return (
				<div className="text-right">
					<DeleteConfirmModal
						isOpen={isDeleteOpen}
						title="Are you absolutely sure?"
						description="This action cannot be undone."
						onConfirm={() => mutate()}
						setOpen={setIsDeleteOpen}
					/>
					<UpdateCategoryModal isOpen={isUpdateOpen} setOpen={setIsUpdateOpen} data={category} />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>Update</DropdownMenuItem>
							<DropdownMenuItem className="bg-destructive" onClick={() => setIsDeleteOpen(true)}>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

function RouteComponent() {
	const { data, isPending } = useQuery({
		queryKey: ['categories', 0],
		queryFn: () => categoryApi.read(),
	});

	return isPending ? <div>Loading...</div> : <DataTable columns={columns} data={data?.items ?? ([] as Category[])} />;
}
