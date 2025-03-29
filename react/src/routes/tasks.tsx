import taskApi from '@/api/task.api';
import CreateTaskModal from '@/components/create-task-modal';
import DataTable from '@/components/data-table';
import DeleteConfirmModal from '@/components/delete-confirm-modal';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Ban, CircleCheckBig, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/tasks')({
	component: RouteComponent,
});

const columns: ColumnDef<TaskPage>[] = [
	{
		accessorKey: 'ID',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'priority',
		header: 'Priority',
	},
	{
		accessorKey: 'eta',
		header: 'ETA',
		cell: ({ row }) => {
			const eta = parseFloat(row.getValue('eta'));
			return <div className="font-medium">{`${eta} hour${eta != 1 ? 's' : ''}`}</div>;
		},
	},
	{
		accessorKey: 'remainingEta',
		header: 'Remaining ETA',
		cell: ({ row }) => {
			const remainingEta = parseFloat(row.getValue('remainingEta'));
			return <div className="font-medium">{`${remainingEta} hour${remainingEta != 1 ? 's' : ''}`}</div>;
		},
	},
	{
		accessorKey: 'isAvailable',
		header: 'Availability',
		cell: ({ row }) => {
			const isAvailable = row.getValue('isAvailable');
			console.log('isAvailable :>> ', isAvailable);
			return <div className="font-medium">{isAvailable ? <CircleCheckBig /> : <Ban />}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const task = row.original;

			const queryClient = useQueryClient();

			const [isDeleteOpen, setIsDeleteOpen] = useState(false);
			const [isUpdateOpen, setIsUpdateOpen] = useState(false);

			const { mutate } = useMutation({
				mutationFn: () => taskApi.remove(task.ID),
				onSuccess: () => {
					toast('Task has been deleted.');
					queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
					{/* <UpdateMemberModal isOpen={isUpdateOpen} setOpen={setIsUpdateOpen} data={task} /> */}
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
		queryKey: ['tasks', page],
		queryFn: () => taskApi.read(page),
	});

	return isPending ? (
		<div>Loading...</div>
	) : (
		<DataTable
			columns={columns}
			data={data?.items ?? ([] as TaskPage[])}
			meta={{
				first: data?.first ?? true,
				last: data?.last ?? true,
			}}
			onNextPage={() => setPage(page + 1)}
			onPreviousPage={() => setPage(page - 1)}
			header={
				<>
					<h1 className="text-2xl mx-2 my-1">Category</h1>
					<CreateTaskModal />
					<Separator className="mb-4" />
				</>
			}
		/>
	);
}
