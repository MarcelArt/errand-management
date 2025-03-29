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
import categoryApi from '@/api/category.api';
import { toast } from 'sonner';

interface UpdateCategoryModalProps {
	setOpen: (value: boolean) => void;
	isOpen: boolean;
	data: Category;
}

export default function UpdateCategoryModal({ setOpen, isOpen, data }: UpdateCategoryModalProps) {
	const [category, setCategory] = useState(data.value);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => categoryApi.update(data.ID, { value: category }),
		onSuccess: () => {
			toast('Category has been updated.');
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			setOpen(false);
		},
	});

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Category</DialogTitle>
					<DialogDescription>Update category here. Click save when you're done.</DialogDescription>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="category" className="text-right">
								Category
							</Label>
							<Input id="category" value={category} className="col-span-3" onChange={(e) => setCategory(e.target.value)} />
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
