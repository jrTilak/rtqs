import { createFileRoute } from '@tanstack/react-router';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	IconSearch,
	IconPlus,
	IconChevronDown,
	IconCircleCheck,
	IconCircleX,
	IconUsers,
	IconUserShield,
	IconUserCircle,
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
} from '@tanstack/react-table';

// User type
type User = {
	id: number;
	name: string;
	email: string;
	role: 'Admin' | 'Participant';
	status: 'Active' | 'Inactive';
	joinedDate: string;
	lastActive: string;
};

// Mock data for users
const MOCK_USERS: User[] = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john.doe@example.com',
		role: 'Admin',
		status: 'Active',
		joinedDate: '2024-01-15',
		lastActive: '2 hours ago',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		role: 'Participant',
		status: 'Active',
		joinedDate: '2024-02-20',
		lastActive: '5 minutes ago',
	},
	{
		id: 3,
		name: 'Robert Johnson',
		email: 'robert.j@example.com',
		role: 'Admin',
		status: 'Active',
		joinedDate: '2023-12-10',
		lastActive: '1 day ago',
	},
	{
		id: 4,
		name: 'Emily Davis',
		email: 'emily.davis@example.com',
		role: 'Participant',
		status: 'Inactive',
		joinedDate: '2024-03-05',
		lastActive: '2 weeks ago',
	},
	{
		id: 5,
		name: 'Michael Brown',
		email: 'michael.b@example.com',
		role: 'Participant',
		status: 'Active',
		joinedDate: '2024-01-28',
		lastActive: '30 minutes ago',
	},
	{
		id: 6,
		name: 'Sarah Wilson',
		email: 'sarah.wilson@example.com',
		role: 'Admin',
		status: 'Active',
		joinedDate: '2023-11-15',
		lastActive: '3 hours ago',
	},
	{
		id: 7,
		name: 'David Martinez',
		email: 'david.m@example.com',
		role: 'Participant',
		status: 'Active',
		joinedDate: '2024-02-14',
		lastActive: '1 hour ago',
	},
	{
		id: 8,
		name: 'Lisa Anderson',
		email: 'lisa.anderson@example.com',
		role: 'Participant',
		status: 'Inactive',
		joinedDate: '2024-01-08',
		lastActive: '1 month ago',
	},
	{
		id: 9,
		name: 'James Taylor',
		email: 'james.taylor@example.com',
		role: 'Participant',
		status: 'Active',
		joinedDate: '2024-03-12',
		lastActive: '15 minutes ago',
	},
	{
		id: 10,
		name: 'Patricia Thomas',
		email: 'patricia.t@example.com',
		role: 'Admin',
		status: 'Active',
		joinedDate: '2023-10-22',
		lastActive: '4 hours ago',
	},
];

export const Route = createFileRoute('/admin/users')({
	component: RouteComponent,
});

function RouteComponent() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	// Calculate stats
	const totalUsers = MOCK_USERS.length;
	const adminUsers = MOCK_USERS.filter((user) => user.role === 'Admin').length;
	const participants = MOCK_USERS.filter(
		(user) => user.role === 'Participant'
	).length;

	// Define columns
	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				accessorKey: 'id',
				header: '#',
				size: 60,
			},
			{
				accessorKey: 'name',
				header: 'Name',
				cell: ({ row }) => (
					<div className="font-medium">{row.getValue('name')}</div>
				),
			},
			{
				accessorKey: 'email',
				header: 'Email',
				cell: ({ row }) => (
					<div className="text-muted-foreground">{row.getValue('email')}</div>
				),
			},
			{
				accessorKey: 'role',
				header: 'Role',
				cell: ({ row }) => {
					const role = row.getValue('role') as string;
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm" className="gap-1">
									{role}
									<IconChevronDown className="size-3" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuItem>Admin</DropdownMenuItem>
								<DropdownMenuItem>Participant</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				},
			},
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ row }) => {
					const status = row.getValue('status') as string;
					const isActive = status === 'Active';
					return (
						<div className="flex items-center gap-1.5">
							{isActive ? (
								<IconCircleCheck className="size-4 text-green-600" />
							) : (
								<IconCircleX className="size-4 text-red-600" />
							)}
							<span>{status}</span>
						</div>
					)
				},
			},
			{
				accessorKey: 'joinedDate',
				header: 'Joined Date',
				cell: ({ row }) => {
					const date = new Date(row.getValue('joinedDate'));
					return date.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})
				},
			},
			{
				accessorKey: 'lastActive',
				header: 'Last Active',
			},
		],
		[]
	)

	const table = useReactTable({
		data: MOCK_USERS,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
	})

	return (
		<div className="w-full space-y-6 p-6">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<Card size="sm" className="rounded-2xl">
					<CardHeader>
						<CardDescription className="text-xs flex items-center gap-2">
							<IconUsers className="size-4" />
							Total Users
						</CardDescription>
						<CardTitle className="flex items-baseline gap-2">
							<span className="text-3xl font-bold">{totalUsers}</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-xs text-muted-foreground">
							All registered users in the system
						</p>
					</CardContent>
				</Card>

				<Card size="sm" className="rounded-2xl">
					<CardHeader>
						<CardDescription className="text-xs flex items-center gap-2">
							<IconUserShield className="size-4" />
							Admin Users
						</CardDescription>
						<CardTitle className="flex items-baseline gap-2">
							<span className="text-3xl font-bold">{adminUsers}</span>
							<span className="text-xs font-medium flex items-center gap-0.5 text-muted-foreground">
								{Math.round((adminUsers / totalUsers) * 100)}%
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-xs text-muted-foreground">
							Users with administrative privileges
						</p>
					</CardContent>
				</Card>

				<Card size="sm" className="rounded-2xl">
					<CardHeader>
						<CardDescription className="text-xs flex items-center gap-2">
							<IconUserCircle className="size-4" />
							Participants
						</CardDescription>
						<CardTitle className="flex items-baseline gap-2">
							<span className="text-3xl font-bold">{participants}</span>
							<span className="text-xs font-medium flex items-center gap-0.5 text-muted-foreground">
								{Math.round((participants / totalUsers) * 100)}%
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-xs text-muted-foreground">
							Standard participant users
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Search bar and action button */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative flex-1 max-w-md">
					<IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type='search'
						placeholder="Search by name or email..."
						className='pl-10'
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<Button size="sm">
					<IconPlus className="size-4" />
					Add User
				</Button>
			</div>

			{/* TanStack Table */}
			<div className="rounded-xl border bg-white shadow-sm">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											style={{
												width:
													header.getSize() !== 150
														? header.getSize()
														: undefined,
											}}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.length > 0 ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'>
										No users found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>

				{/* Pagination footer */}
				<div className="flex items-center justify-between border-t px-4 py-3">
					<div className="text-sm text-muted-foreground">
						Showing {table.getRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} user(s)
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">Rows per page</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-8 w-16">
									{table.getState().pagination.pageSize}
									<IconChevronDown className="size-3" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{[10, 20, 50, 100].map((pageSize) => (
									<DropdownMenuItem
										key={pageSize}
										onClick={() => table.setPageSize(pageSize)}>
										{pageSize}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<span className="text-sm text-muted-foreground">
							Page {table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount()}
						</span>
						<div className="flex gap-1">
							<Button
								variant='outline'
								size='icon-sm'
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}>
								&lt
							</Button>
							<Button
								variant='outline'
								size='icon-sm'
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}>
								&gt
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
