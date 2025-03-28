import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<SidebarProvider>
				<AppSidebar />
				<main className='w-full'>
					<SidebarTrigger />
					<Outlet />
				</main>
			</SidebarProvider>

			<TanStackRouterDevtools />
		</ThemeProvider>
	),
});
