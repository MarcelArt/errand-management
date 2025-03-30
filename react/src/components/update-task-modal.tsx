import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import taskApi from '@/api/task.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { taskPriorities } from '@/constants/priorities';
import { TriangleAlert } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import categoryApi from '@/api/category.api';

interface UpdateTaskModalProps {
	setOpen: (value: boolean) => void;
	isOpen: boolean;
	data: TaskPage;
}

export default function UpdateTaskModal({ setOpen, isOpen, data }: UpdateTaskModalProps) {
	const [categoryId, setCategoryId] = useState(data.categoryId);
	const [eta, setEta] = useState(data.eta);
	const [remainingEta, setRemainingEta] = useState(data.remainingEta);
	const [isAvailable, setIsAvailable] = useState(data.isAvailable);
	const [name, setName] = useState(data.name);
	const [priority, setPriority] = useState(data.priority);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => taskApi.update(data.ID, { name, categoryId, priority, eta, isAvailable, remainingEta: eta }),
		onSuccess: () => {
			toast('Task has been updated.');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			setOpen(false);
		},
	});

  const { data: categories, isPending } = useQuery({
		queryKey: ['category-dropdown'],
		queryFn: () => categoryApi.dropdown(),
	});

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Task</DialogTitle>
					<DialogDescription>Update task here. Click save when you're done.</DialogDescription>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" value={name} className="col-span-3" onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="eta" className="text-right">
								ETA (hours)
							</Label>
							<Input id="eta" value={eta} className="col-span-3" onChange={(e) => setEta(+e.target.value)} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="remainingEta" className="text-left">
								Remaining ETA (hours)
							</Label>
							<Input id="remainingEta" value={remainingEta} className="col-span-3" onChange={(e) => setRemainingEta(+e.target.value)} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="priority" className="text-right">
								Priority Level
							</Label>
							<Select value={priority.toString()} onValueChange={(value) => setPriority(+value)}>
								<SelectTrigger id="priority" className="w-[180px]">
									<SelectValue placeholder="Priority Level" />
								</SelectTrigger>
								<SelectContent>
									{taskPriorities.map((prio) => (
										<SelectItem value={`${prio}`}>{prio === 10 ? <TriangleAlert color="yellow" /> : prio}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="category" className="text-right">
								Category
							</Label>
							<Select value={categoryId.toString()} onValueChange={(value) => setCategoryId(+value)}>
								<SelectTrigger id="category" className="w-[180px]">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									{isPending ? null : categories?.map((c) => <SelectItem value={c.ID.toString()}>{c.value}</SelectItem>)}
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="isAvailable" onCheckedChange={(c) => setIsAvailable(!!c.valueOf())} checked={isAvailable} />
							<Label htmlFor="isAvailable" className="text-right">
								Is Available
							</Label>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button className="bg-violet-600 text-white hover:bg-violet-800" type="submit" onClick={() => mutate()}>
							Save
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
