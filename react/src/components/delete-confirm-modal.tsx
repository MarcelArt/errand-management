import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';

interface DeleteConfirmModalProps {
	onConfirm: () => void;
	title: string;
	description: string;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}

export default function DeleteConfirmModal({ onConfirm, title, description, isOpen, setOpen }: DeleteConfirmModalProps) {
	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-start">
					<Button
						type="button"
						variant="destructive"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
					>
						Confirm
					</Button>
					<Button type="button" variant="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
