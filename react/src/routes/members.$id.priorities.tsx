import memberApi from '@/api/member.api';
import DataTable from '@/components/data-table';
import MemberPrioritySelector from '@/components/member-priority-selector';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

export const Route = createFileRoute('/members/$id/priorities')({
	component: RouteComponent,
});

const columns: ColumnDef<MemberWithCategoryPriority>[] = [
	{
		accessorKey: 'category',
		header: 'Category',
	},
	{
		accessorKey: 'priority',
		header: 'Priority',
		cell: ({ row }) => {
      console.log('row :>> ', row);
			const priority = parseInt(row.getValue('priority'));
			const id = row.original.ID;
			const categoryId = row.original.categoryId;
			const memberId = row.original.memberId;
			return (
				<div className="font-medium">
					<MemberPrioritySelector priority={priority} categoryId={categoryId} memberId={memberId} id={id} />
				</div>
			);
		},
	},
];

function RouteComponent() {
	const { id } = Route.useParams();

	const [page, setPage] = useState(0);

	const { data, isPending } = useQuery({
		queryKey: ['members-priorities', id, page],
		queryFn: () => memberApi.getWithCategoryPriorities(+id, page),
	});

  const { data: member } = useQuery({
    queryKey: ['members', id],
    queryFn: () => memberApi.getById(+id),
  })

	return isPending ? (
		<div>Loading...</div>
	) : (
		<DataTable
			columns={columns}
			data={data?.items ?? ([] as MemberWithCategoryPriority[])}
			meta={{
				first: data?.first ?? true,
				last: data?.last ?? true,
			}}
			onNextPage={() => setPage(page + 1)}
			onPreviousPage={() => setPage(page - 1)}
			header={
				<>
					<h1 className="text-2xl mx-2 my-1">{member?.items?.name}'s priorities</h1>
					<Separator className="mb-4" />
				</>
			}
		/>
	);
}
