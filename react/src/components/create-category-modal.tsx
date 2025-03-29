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
import categoryApi from '@/api/category.api';
import { toast } from 'sonner';

export default function CreateCategoryModal() {
	const [category, setCategory] = useState('');

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => categoryApi.create({ value: category }),
		onSuccess: () => {
			toast('Category has been created.');
			setCategory('');
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mx-2 my-4 bg-violet-600 text-white hover:bg-violet-800">Create</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Category</DialogTitle>
					<DialogDescription>Create category here. Click save when you're done.</DialogDescription>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="category" className="text-right">
								Category
							</Label>
							<Input id="category" value={category} className="col-span-3" onChange={(e) => setCategory(e.target.value)} />
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
