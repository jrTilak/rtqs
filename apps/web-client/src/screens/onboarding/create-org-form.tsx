import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/server/rest-api/auth";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
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

  return (
    <Form {...form}>
      <form className="space-y-3">
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

        <Button className="w-full mt-3">Create organization</Button>
      </form>
    </Form>
  );
};
