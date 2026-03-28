"use client";

import { DashboardContainer } from "@/screens/dashboard/dashboard-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { cn } from "@/lib/utils";
import { IconLayoutGrid, IconList, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

type ViewMode = "grid" | "list";

const MOCK_FOLDERS = [
  { id: "1", name: "My Quizzes", itemCount: 12, updated: "1 hour ago" },
  { id: "2", name: "Shared with me", itemCount: 3, updated: "Yesterday" },
];

const MOCK_QUIZZES = [
  { id: "1", title: "React Basics", questions: 15, updated: "2 days ago" },
  { id: "2", title: "TypeScript Quiz", questions: 20, updated: "1 week ago" },
  { id: "3", title: "API Design", questions: 10, updated: "3 days ago" },
  { id: "4", title: "CSS Layouts", questions: 18, updated: "5 days ago" },
  { id: "5", title: "State Management", questions: 12, updated: "1 day ago" },
  {
    id: "6",
    title: "Testing Fundamentals",
    questions: 14,
    updated: "4 days ago",
  },
];

function ImagePlaceholder({
  icon,
  className,
}: {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted rounded-md text-muted-foreground",
        className,
      )}
    >
      {icon}
    </div>
  );
}

export function QuizzesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <DashboardContainer title="Quizzes">
      {/* Header: title auto space, search, actions, sort, grid/list, dropdown */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-30" />
        <Input
          placeholder="Search quizzes..."
          className="max-w-xs"
          beforeContent={<Icon name={ICONS_ENUM.SEARCH} />}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Type
              <IconChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All types</DropdownMenuItem>
            <DropdownMenuItem>Quiz</DropdownMenuItem>
            <DropdownMenuItem>Collection</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort
              <IconChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>Modified</DropdownMenuItem>
            <DropdownMenuItem>Created</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ButtonGroup>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
          >
            <IconLayoutGrid className="size-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
          >
            <IconList className="size-4" />
          </Button>
        </ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              Add New
              <IconChevronDown className="size-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New quiz</DropdownMenuItem>
            <DropdownMenuItem>New folder</DropdownMenuItem>
            <DropdownMenuItem>Import</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Folders list */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          Name
          <span className="text-muted-foreground/80">↑</span>
        </p>
        {viewMode === "grid" ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 list-none p-0 m-0">
            {MOCK_FOLDERS.map((folder) => (
              <li key={folder.id} className="min-w-0">
                <Card
                  size="sm"
                  className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-shadow p-0 gap-0"
                >
                  <div className="relative w-full">
                    <ImagePlaceholder
                      icon={
                        <Icon name={ICONS_ENUM.FOLDER} className="size-10" />
                      }
                      className="w-full aspect-4/3 rounded-t-lg rounded-b-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Folder options"
                      className="absolute top-2 right-2 z-10"
                    >
                      <Icon name={ICONS_ENUM.OPTIONS} />
                    </Button>
                  </div>
                  <CardContent className="pt-3">
                    <CardTitle className="text-sm truncate">
                      {folder.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {folder.itemCount} items · {folder.updated}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="rounded-lg border divide-y list-none p-0 m-0">
            <li className="grid grid-cols-[minmax(0,1fr)_6rem_4rem_2.5rem] gap-3 items-center px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              <span>Name</span>
              <span>Modified</span>
              <span>Items</span>
              <span className="w-6" />
            </li>
            {MOCK_FOLDERS.map((folder) => (
              <li
                key={folder.id}
                className="grid grid-cols-[minmax(0,1fr)_6rem_4rem_2.5rem] gap-3 items-center px-3 py-2.5 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ImagePlaceholder
                    icon={<Icon name={ICONS_ENUM.FOLDER} className="size-6" />}
                    className="size-10 shrink-0 rounded"
                  />
                  <span className="text-sm font-medium truncate">
                    {folder.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground truncate">
                  {folder.updated}
                </span>
                <span className="text-xs text-muted-foreground">
                  {folder.itemCount}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Folder options"
                >
                  <Icon name={ICONS_ENUM.OPTIONS} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Files list (grid or list) */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Recent</p>
        {viewMode === "grid" ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 list-none p-0 m-0">
            {MOCK_QUIZZES.map((quiz) => (
              <li key={quiz.id} className="min-w-0">
                <Card
                  size="sm"
                  className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-shadow p-0 gap-0"
                >
                  <div className="relative w-full">
                    <ImagePlaceholder
                      icon={<Icon name={ICONS_ENUM.QUIZ} className="size-10" />}
                      className="w-full aspect-4/3 rounded-t-lg rounded-b-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Options"
                      className="absolute top-2 right-2 z-10"
                    >
                      <Icon name={ICONS_ENUM.OPTIONS} />
                    </Button>
                  </div>
                  <CardContent className="pt-3">
                    <CardTitle className="text-sm truncate">
                      {quiz.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {quiz.questions} questions · {quiz.updated}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="rounded-lg border divide-y list-none p-0 m-0">
            <li className="grid grid-cols-[minmax(0,1fr)_6rem_5rem_2.5rem] gap-3 items-center px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              <span>Name</span>
              <span>Modified</span>
              <span>Questions</span>
              <span className="w-6" />
            </li>
            {MOCK_QUIZZES.map((quiz) => (
              <li
                key={quiz.id}
                className="grid grid-cols-[minmax(0,1fr)_6rem_5rem_2.5rem] gap-3 items-center px-3 py-2.5 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ImagePlaceholder
                    icon={<Icon name={ICONS_ENUM.QUIZ} className="size-6" />}
                    className="size-10 shrink-0 rounded"
                  />
                  <span className="text-sm font-medium truncate">
                    {quiz.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground truncate">
                  {quiz.updated}
                </span>
                <span className="text-xs text-muted-foreground">
                  {quiz.questions}
                </span>
                <Button variant="ghost" size="icon-xs" aria-label="Options">
                  <Icon name={ICONS_ENUM.OPTIONS} />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardContainer>
  );
}
