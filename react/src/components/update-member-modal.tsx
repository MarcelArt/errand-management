import { useState } from 'react';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import memberApi from '@/api/member.api';

interface UpdateMemberModalProps {
	setOpen: (value: boolean) => void;
	isOpen: boolean;
	data: MemberPage;
}

export default function UpdateMemberModal({ setOpen, isOpen, data }: UpdateMemberModalProps) {
	const [name, setName] = useState(data.name);
	const [maxLoad, setMaxLoad] = useState(data.maxLoad);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => memberApi.update(data.ID, { name, maxLoad }),
		onSuccess: () => {
			toast('Member has been updated.');
			queryClient.invalidateQueries({ queryKey: ['members'] });
			setOpen(false);
		},
	});

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Member</DialogTitle>
					<DialogDescription>Update member here. Click save when you're done.</DialogDescription>
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
