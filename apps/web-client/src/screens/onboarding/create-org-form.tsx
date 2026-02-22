import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
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
import { parseErrorMessage } from "@/lib/parse-error-message";
import { server } from "@/server/rest-api";
import { useUser } from "@/server/rest-api/auth";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and can contain hyphens",
    ),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const CreateOrgForm = () => {
  const user = useUser();
  const navigate = useNavigate();
  const createOrg = useMutation(server.orgs.createOptions);
  const queryClient = useQueryClient();
  const form = useForm<FormSchemaType>({
    defaultValues: {
      name: `${user.name.split(" ")[0]}'s Organization`,
      slug: `org-${user.name.split(" ")[0].toLowerCase()}`,
    },
  });

  useEffect(() => {
    form.setValue("name", `${user.name.split(" ")[0]}'s Organization`);
    form.setValue("slug", `org-${user.name.split(" ")[0].toLowerCase()}`);
  }, [user, form]);

  const onSubmit = async (data: FormSchemaType) => {
    try {
      await createOrg.mutateAsync({
        ...data,
        keepCurrentActiveOrganization: false,
      });
      await queryClient.invalidateQueries(server.orgs.listOptions);
      navigate({ to: "/", replace: true });
    } catch (error) {
      alert({
        title: "Error!!",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name*</FormLabel>
              <FormControl>
                <Input
                  beforeContent={<Icon name={ICONS_ENUM.ORGANIZATION} />}
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
              <FormLabel>Slug*</FormLabel>
              <FormControl>
                <Input
                  beforeContent={<Icon name={ICONS_ENUM.USERNAME} />}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={createOrg.isPending} className="w-full mt-3">
          Create organization
        </Button>
      </form>
    </Form>
  );
};
