import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type SortDirection,
  type Table as TableType,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
} from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { Button } from "../ui/button";
import { Icon } from "../icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";
import { P } from "../ui/typography";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

const _PAGE_SIZE_OPTIONS = [10, 15, 20, 50];
const _DEFAULT_PAGE_SIZE = 10;

function getColumnId(col: ColumnDef<unknown, unknown>, index: number): string {
  const c = col as { id?: string; accessorKey?: string };
  return (
    c.id ??
    (typeof c.accessorKey === "string" ? c.accessorKey : null) ??
    `col-${index}`
  );
}

function getPaginationItems(
  totalPages: number,
  currentPage: number,
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  const show = new Set<number>([0, totalPages - 1]);
  for (let i = -1; i <= 1; i++) {
    const p = currentPage + i;
    if (p >= 0 && p < totalPages) show.add(p);
  }
  const sorted = [...show].sort((a, b) => a - b);
  const items: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) items.push("ellipsis");
    items.push(sorted[i]!);
  }
  return items;
}

interface DataTableContextType<TData> {
  table: TableType<TData>;
  showSerialNumber?: boolean;
  action?: (row: TData) => React.ReactNode;
  search: string;
  setSearch: (search: string) => void;
}

const DataTableContext = createContext<DataTableContextType<any> | null>(null);

const useDataTable = <TData,>() => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableRoot");
  }
  return context as DataTableContextType<TData>;
};

type DataTableProps<TData, TValue> = {
  children: React.ReactNode;
  columns: (ColumnDef<TData, TValue> & {
    defaultVisible?: boolean;
  })[];
  data: TData[];
  showSerialNumber?: boolean;
  action?: (row: TData) => React.ReactNode;
  defaultSorting?: Readonly<SortingState>;
};

function DataTable<TData, TValue>({
  columns,
  data,
  action,
  showSerialNumber = true,
  children,
  defaultSorting = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSorting as SortingState,
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: _DEFAULT_PAGE_SIZE,
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const initialColumnVisibility = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc[column.id || ""] = column.defaultVisible ?? true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [columns]);

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(initialColumnVisibility);

  const table = useReactTable({
    data,
    columns: columns.map((column, i) => {
      const headerLabel =
        typeof column.header === "string"
          ? column.header
          : getColumnId(column as ColumnDef<unknown, unknown>, i);
      return {
        ...column,
        meta: { ...column.meta, headerLabel },
        header:
          column.header && column.enableSorting === true
            ? (ctx: {
              column: {
                id: string;
                getIsSorted: () => false | "asc" | "desc";
              };
            }) => (
              <Button
                type="button"
                variant="ghost"
                className="px-0 hover:bg-transparent group"
                onClick={() => {
                  setSorting((prev) => {
                    const id = ctx.column.id;
                    const current = prev.find((s) => s.id === id);
                    if (!current) return [{ id, desc: false }];
                    if (!current.desc) return [{ id, desc: true }];
                    return [];
                  });
                }}
              >
                {flexRender(column.header as never, ctx as never)}
                <SortIcon
                  direction={ctx.column.getIsSorted() as SortDirection}
                />
              </Button>
            )
            : column.header,
      };
    }) as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      pagination,
      globalFilter: debouncedSearch,
      columnVisibility,
    },
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [debouncedSearch, table]);

  return (
    <DataTableContext.Provider
      value={{ table, showSerialNumber, action, search, setSearch }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

type DataTableFullRowProps = ComponentProps<typeof TableCell>;
function DataTableFullRow({
  children,
  className,
  ...props
}: DataTableFullRowProps) {
  const { table, showSerialNumber, action } = useDataTable();
  return (
    <TableRow>
      <TableCell
        colSpan={
          table.getHeaderGroups()[0]?.headers.length +
          (showSerialNumber ? 1 : 0) +
          (action ? 1 : 0)
        }
        className={cn("h-24 text-center pl-4 pr-4", className)}
        {...props}
      >
        {children}
      </TableCell>
    </TableRow>
  );
}

type DataTableEmptyProps = ComponentProps<typeof TableCell>;
function DataTableEmpty({
  children,
  className,
  ...props
}: DataTableEmptyProps) {
  const { table } = useDataTable();
  const rows = table.getRowModel().rows;
  if (rows.length) return null;
  return (
    <DataTableFullRow className={className} {...props}>
      {typeof children === "string" ? (
        <P>{children}</P>
      ) : (
        (children ?? <P>No data.</P>)
      )}
    </DataTableFullRow>
  );
}

type DataTableRowsProps = Omit<ComponentProps<typeof TableRow>, "children">;
function DataTableRows({ className, ...props }: DataTableRowsProps) {
  const { table, showSerialNumber, action } = useDataTable();
  const rows = table.getRowModel().rows;
  if (!rows.length) return null;
  return rows.map((row) => (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      {...props}
    >
      {showSerialNumber && (
        <TableCell className="pl-4">{row.index + 1}.</TableCell>
      )}
      {row.getVisibleCells().map((cell, i) => (
        <TableCell
          key={cell.id}
          className={
            (i === 0 && !showSerialNumber ? "pl-4 " : "") +
            (i === row.getVisibleCells().length - 1 && !action ? "pr-4" : "")
          }
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {action && <TableCell className="pr-4">{action(row.original)}</TableCell>}
    </TableRow>
  ));
}

type DataTableHeaderProps = Omit<
  ComponentProps<typeof TableHeader>,
  "children"
>;
function DataTableHeader({ ...props }: DataTableHeaderProps) {
  const { table, action, showSerialNumber } = useDataTable();
  return (
    <TableHeader {...props}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {showSerialNumber && <TableHead className="w-10 pl-4">SN</TableHead>}
          {headerGroup.headers.map((header, i) => (
            <TableHead
              key={header.id}
              className={
                (i === 0 && !showSerialNumber ? "pl-4 " : "") +
                (i === headerGroup.headers.length - 1 && !action ? "pr-4" : "")
              }
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
            </TableHead>
          ))}
          {action && <TableHead className="w-10 pr-4" />}
        </TableRow>
      ))}
    </TableHeader>
  );
}

type DataTablePaginationProps = Omit<
  ComponentProps<typeof Pagination>,
  "children"
>;
function DataTablePagination({
  className,
  ...props
}: DataTablePaginationProps) {
  const { table } = useDataTable();
  const pageCount = table.getPageCount();
  const { pageIndex } = table.getState().pagination;
  const goToPage = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, pageCount - 1));
      table.setPageIndex(clamped);
    },
    [table, pageCount],
  );

  const paginationItems = useMemo(
    () => getPaginationItems(pageCount, pageIndex),
    [pageCount, pageIndex],
  );

  if (pageCount < 1) return null;
  return (
    <Pagination className={cn("min-w-fit", className)} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="icon-sm"
            disabled={!table.getCanPreviousPage()}
            onClick={(e) => {
              e.preventDefault();
              if (table.getCanPreviousPage()) goToPage(pageIndex - 1);
            }}
          />
        </PaginationItem>
        {paginationItems.map((item, i) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                size="icon-sm"
                isActive={item === pageIndex}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(item);
                }}
                className="cursor-pointer"
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            size="icon-sm"
            disabled={!table.getCanNextPage()}
            onClick={(e) => {
              e.preventDefault();
              if (table.getCanNextPage()) goToPage(pageIndex + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

type DataTablePageSizeOptionsProps = {
  pageSizeOptions?: number[];
} & Omit<ComponentProps<"div">, "children">;
function DataTablePageSizeOptions({
  pageSizeOptions = _PAGE_SIZE_OPTIONS,
  className,
  ...props
}: DataTablePageSizeOptionsProps) {
  const { table } = useDataTable();
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger size="sm" className="w-16">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent className="w-32">
          <SelectGroup>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">per page</span>
    </div>
  );
}

type DataTableFooterProps = Omit<
  ComponentProps<typeof TableFooter>,
  "children"
>;
function DataTableFooter({ className, ...props }: DataTableFooterProps) {
  const { table, showSerialNumber, action } = useDataTable();
  let totalColumns = table.getHeaderGroups()[0]?.headers.length ?? 0;
  if (showSerialNumber) totalColumns++;
  if (action) totalColumns++;
  return (
    <TableFooter className={cn("bg-transparent", className)} {...props}>
      <TableRow>
        <TableCell colSpan={totalColumns - 1}>
          <DataTablePageSizeOptions />
        </TableCell>
        <TableCell colSpan={1}>
          <DataTablePagination />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

type DataTableSearchProps = {
  placeholder?: string;
} & Omit<ComponentProps<typeof Input>, "value" | "onChange">;
function DataTableSearch({
  placeholder = "Search...",
  beforeContent = <Icon name={ICONS_ENUM.SEARCH} />,
  ...props
}: DataTableSearchProps) {
  const { search, setSearch } = useDataTable();
  return (
    <Input
      beforeContent={beforeContent}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      {...props}
    />
  );
}

type DataTableAdjustmentsProps = Omit<ComponentProps<"div">, "children">;
function DataTableAdjustments({
  className,
  ...props
}: DataTableAdjustmentsProps) {
  const { table } = useDataTable();
  const hideableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanHide());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <Icon name={ICONS_ENUM.ADJUSTMENTS} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-56 p-0", className)}
        align="end"
        {...props}
      >
        <div className="flex flex-col gap-1 p-2">
          {hideableColumns.length > 0 && (
            <>
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Visible columns
              </div>
              <div className="grid grid-cols-2 gap-2">
                {hideableColumns.map((column) => {
                  const meta = column.columnDef.meta as
                    | { headerLabel?: string }
                    | undefined;
                  const label = meta?.headerLabel ?? column.id;
                  return (
                    <Label key={column.id} className="cursor-pointer">
                      <Checkbox
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                        className="cursor-pointer"
                      />
                      <span className="truncate">{label}</span>
                    </Label>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") {
    return (
      <Icon
        name={ICONS_ENUM.SORT_ASC}
        className="size-4 text-muted-foreground"
      />
    );
  }
  if (direction === "desc") {
    return (
      <Icon
        name={ICONS_ENUM.SORT_DESC}
        className="size-4 text-muted-foreground"
      />
    );
  }
  return (
    <Icon
      name={ICONS_ENUM.SORT_NONE}
      className="size-4 text-muted-foreground opacity-10 group-hover:opacity-100 transition-opacity"
    />
  );
}

DataTable.PageSizeOptions = DataTablePageSizeOptions;
DataTable.Search = DataTableSearch;
DataTable.Pagination = DataTablePagination;
DataTable.Header = DataTableHeader;
DataTable.Footer = DataTableFooter;
DataTable.TableRoot = Table;
DataTable.Body = TableBody;
DataTable.Empty = DataTableEmpty;
DataTable.Rows = DataTableRows;
DataTable.FullRow = DataTableFullRow;
DataTable.Adjustments = DataTableAdjustments;

export { DataTable };
