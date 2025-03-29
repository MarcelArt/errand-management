import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createFileRoute } from '@tanstack/react-router';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoryApi from '@/api/category.api';
import CreateCategoryModal from '@/components/create-category-modal';
import DeleteConfirmModal from '@/components/delete-confirm-modal';
import { useState } from 'react';
import { toast } from 'sonner';
import UpdateCategoryModal from '@/components/update-category-modal';
import DataTable from '@/components/data-table';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/categories')({
	component: RouteComponent,
});

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
				},
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

	return isPending ? (
		<div>Loading...</div>
	) : (
		<DataTable
			columns={columns}
			data={data?.items ?? ([] as Category[])}
			header={
				<>
					<h1 className="text-2xl mx-2 my-1">Category</h1>
					<CreateCategoryModal />
					<Separator className='mb-4'/>
				</>
			}
		/>
	);
}
