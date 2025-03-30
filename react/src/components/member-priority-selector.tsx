import { memberCategoryPriorities } from '@/constants/priorities';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp, Minus, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import memberCategoryPriorityApi from '@/api/memberCategoryPriority.api';

interface MemberPrioritySelectorProps {
  priority: number;
  categoryId: number;
  memberId: number;
  id?: number;
}

export default function MemberPrioritySelector({ priority, categoryId, memberId, id }: MemberPrioritySelectorProps) {
  console.log('{ priority, categoryId, memberId, id } :>> ', { priority, categoryId, memberId, id });
  const [prio, setPrio] = useState(priority);
  const [_id, setId] = useState(id);

	const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (value: number) => {
      setPrio(value);
      return memberCategoryPriorityApi.upsert({ priority: value, categoryId, memberId }, _id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members-priorities', id] });
      
      const created = data.items as CreateResponse;
      setId(created.ID);
    }
  });

  const renderPrioIcon = (prio: number) => {
    if (prio === 0) return <X />;
    if (prio === 1) return <ChevronsDown />;
    if (prio === 2) return <ChevronDown />;
    if (prio === 3) return <Minus />;
    if (prio === 4) return <ChevronUp />;
    if (prio === 5) return <ChevronsUp />;
  }

	return (
		<Select value={prio.toString()} onValueChange={(value) => mutate(+value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={<Minus />} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Priority</SelectLabel>
					{memberCategoryPriorities.map((p) => (
						<SelectItem value={p.toString()}>{renderPrioIcon(p)}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
