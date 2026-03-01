import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alert } from "@/components/ui/confirm-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H2, P } from "@/components/ui/typography";
import { parseErrorMessage } from "@/lib/parse-error-message";
import { server } from "@/server/rest-api";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { OrgLogo } from "./org-logo";
import { QueryState } from "@/components/ui/query-state";
import { Skeleton } from "@/components/ui/skeleton";

const generalFormSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and can contain hyphens",
    ),
  logo: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

type GeneralFormSchema = z.infer<typeof generalFormSchema>;

export function OrgSettingsScreen() {
  const activeOrg = server.orgs.useActiveOrg();
  const queryClient = useQueryClient();
  const updateOrg = useMutation(server.orgs.updateOptions);

  const form = useForm<GeneralFormSchema>({
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
    values:
      activeOrg.data != null
        ? {
          name: activeOrg.data.name ?? "",
          slug: activeOrg.data.slug ?? "",
          logo: activeOrg.data.logo ?? "",
        }
        : undefined,
  });

  const onGeneralSubmit = async (data: GeneralFormSchema) => {
    if (!activeOrg.data?.id) return;
    try {
      await updateOrg.mutateAsync({
        organizationId: activeOrg.data.id,
        data: {
          name: data.name,
          slug: data.slug,
          logo: data.logo || undefined,
        },
      });
      await queryClient.invalidateQueries(server.orgs.listOptions);
      alert({
        title: "Saved",
        description: "Organization settings have been updated.",
      });
    } catch (error) {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <H2>Organization settings</H2>
        <P className="mt-1">
          Manage your organization profile and preferences.
        </P>
      </div>

      <QueryState {...activeOrg} isEmpty={!activeOrg.data}>
        <QueryState.Data>
          <Tabs defaultValue="general" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                  <CardDescription>
                    Update your organization name, slug, and logo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onGeneralSubmit)}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-lg border bg-P">
                          <OrgLogo
                            src={form.watch("logo") || activeOrg.data?.logo}
                            className="size-12 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Logo URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://..."
                                    autoComplete="off"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization name</FormLabel>
                            <FormControl>
                              <Input
                                beforeContent={
                                  <Icon name={ICONS_ENUM.ORGANIZATION} />
                                }
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                              <Input
                                beforeContent={
                                  <Icon name={ICONS_ENUM.USERNAME} />
                                }
                                autoComplete="off"
                                placeholder="my-org"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        isLoading={updateOrg.isPending}
                        disabled={!form.formState.isDirty}
                      >
                        Save changes
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Organization-wide preferences and defaults.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-P-foreground text-sm">
                    Preference options will appear here (e.g. default timezone,
                    date format, notifications).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Members</CardTitle>
                  <CardDescription>
                    Invite and manage organization members.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-P-foreground text-sm">
                    Member list and invite actions will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="more" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>More</CardTitle>
                  <CardDescription>
                    Imports, integrations, and advanced options.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-P-foreground text-sm">
                    Import/export and other advanced settings will appear here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </QueryState.Data>
        <QueryState.Loading>
          <Skeleton className="h-64 w-full max-w-2xl" />
        </QueryState.Loading>
        <QueryState.Error />
      </QueryState>
    </div>
  );
}
