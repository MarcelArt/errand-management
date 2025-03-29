import { useState } from 'react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import taskApi from '@/api/task.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { taskPriorities } from '../constants/priorities';
import { TriangleAlert } from 'lucide-react';
import categoryApi from '@/api/category.api';
import { Checkbox } from './ui/checkbox';

export default function CreateTaskModal() {
	const [categoryId, setCategoryId] = useState(0);
	const [eta, setEta] = useState(0);
	const [isAvailable, setIsAvailable] = useState(true);
	const [name, setName] = useState('');
	const [priority, setPriority] = useState(5);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => taskApi.create({ name, categoryId, priority, eta, isAvailable, remainingEta: eta }),
		onSuccess: () => {
			toast('Task has been created.');
			setName('');
			setCategoryId(0);
			setEta(0);
			setIsAvailable(true);
			setPriority(5);
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const { data, isPending } = useQuery({
		queryKey: ['category-dropdown'],
		queryFn: () => categoryApi.dropdown(),
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mx-2 my-4 bg-violet-600 text-white hover:bg-violet-800">Create</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Task</DialogTitle>
					<DialogDescription>Create task here. Click save when you're done.</DialogDescription>
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
							<Label htmlFor="priority" className="text-right">
								Priority Level
							</Label>
							<Select value={priority.toString()} onValueChange={(value) => setPriority(+value)}>
								<SelectTrigger id="priority" className='w-[180px]'>
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
								<SelectTrigger id="category" className='w-[180px]'>
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									{isPending ? null : data?.map((c) => <SelectItem value={c.ID.toString()}>{c.value}</SelectItem>)}
								</SelectContent>
							</Select>
						</div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isAvailable" onCheckedChange={c => setIsAvailable(!!c.valueOf())} checked={isAvailable} />
							<Label htmlFor="isAvailable" className="text-right">
								Is Available
							</Label>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button className="bg-violet-600 text-white hover:bg-violet-800" type="submit" onClick={() => mutate()}>
								Save
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
