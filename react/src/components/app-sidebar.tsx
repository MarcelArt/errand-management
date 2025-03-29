import { Home, ListTodo, Settings, Users } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/',
		icon: Home,
	},
	{
		title: 'Category',
		url: '/categories',
		icon: Settings,
	},
	{
		title: 'Member',
		url: '/members',
		icon: Users,
	},
	{
		title: 'Task',
		url: '/tasks',
		icon: ListTodo,
	},
];

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Errand Management</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
