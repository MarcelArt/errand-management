import categoryApi from '@/api/category.api';
import memberApi from '@/api/member.api';
import DataTable from '@/components/data-table';
import DeleteConfirmModal from '@/components/delete-confirm-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/members')({
  component: RouteComponent,
})

const columns: ColumnDef<MemberPage>[] = [
	{
		accessorKey: 'ID',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'maxLoad',
		header: 'Max Load',
    cell: ({ row }) => {
      const maxLoad = parseFloat(row.getValue("maxLoad"));
      return <div className="font-medium">{`${maxLoad} hour${maxLoad != 1 ? 's': ''}`}</div>
    }
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const member = row.original;

			const queryClient = useQueryClient();

			const [isDeleteOpen, setIsDeleteOpen] = useState(false);
			const [isUpdateOpen, setIsUpdateOpen] = useState(false);

			const { mutate } = useMutation({
				// mutationFn: () => categoryApi.remove(category.ID),
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
					{/* <UpdateCategoryModal isOpen={isUpdateOpen} setOpen={setIsUpdateOpen} data={category} /> */}
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
	const [page, setPage] = useState(0);

  const { data, isPending } = useQuery({
		queryKey: ['members', page],
		queryFn: () => memberApi.read(page),
	});

  return isPending ? (
		<div>Loading...</div>
	) : (
		<DataTable
			columns={columns}
			data={data?.items ?? ([] as MemberPage[])}
			meta={{
				first: data?.first ?? true,
				last: data?.last ?? true,
			}}
			onNextPage={() => setPage(page + 1)}
			onPreviousPage={() => setPage(page - 1)}
			header={
				<>
					<h1 className="text-2xl mx-2 my-1">Category</h1>
					{/* <CreateCategoryModal /> */}
					<Separator className='mb-4'/>
				</>
			}
		/>
	);
}
