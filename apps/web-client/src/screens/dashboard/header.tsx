import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export function Header() {
  const { breadcrumbs } = useSidebar();

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center justify-between gap-1 px-4 py-3 lg:gap-2 lg:px-6">
          <div className="flex items-center gap-1">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-6 my-auto"
            />
            {breadcrumbs.length > 0 && (
              <Breadcrumb className="ml-2">
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, i) => (
                    <>
                      {i !== 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem key={breadcrumb.url}>
                        <BreadcrumbLink href={breadcrumb.url}>
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
          <div className="ml-auto flex items-center">
            <ThemeModeToggle variant="ghost" />
          </div>
        </div>
      </header>
    </>
  );
}
