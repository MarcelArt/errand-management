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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import memberApi from '@/api/member.api';

export default function CreateMemberModal() {
	const [name, setName] = useState('');
	const [maxLoad, setMaxLoad] = useState(0);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => memberApi.create({ name, maxLoad }),
		onSuccess: () => {
			toast('Member has been created.');
			setName('');
			setMaxLoad(0);
			queryClient.invalidateQueries({ queryKey: ['members'] });
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mx-2 my-4 bg-violet-600 text-white hover:bg-violet-800">Create</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Member</DialogTitle>
					<DialogDescription>Create member here. Click save when you're done.</DialogDescription>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" value={name} className="col-span-3" onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="maxLoad" className="text-right">
								Max Load
							</Label>
							<Input id="maxLoad" value={maxLoad} className="col-span-3" onChange={(e) => setMaxLoad(+e.target.value)} />
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
