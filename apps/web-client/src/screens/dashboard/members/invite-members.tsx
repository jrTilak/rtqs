import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORG_ROLES } from "@/server/rest-api/organizations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { c } from "@/validations/common";
import { Icon } from "@/components/icon";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { server } from "@/server/rest-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseErrorMessage } from "@/lib/parse-error-message";
import { alert } from "@/components/ui/confirm-dialog";
import { omit } from "@/lib/omit";

const __ROLES = omit(ORG_ROLES, ["OWNER"]);

const FormSchema = z.object({
  email: c.email(),
  role: z.enum(__ROLES),
});

type FormValues = z.infer<typeof FormSchema>;

const InviteMembers = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      role: __ROLES.MEMBER,
    },
  });
  const queryClient = useQueryClient();

  const inviteMemberMutation = useMutation(
    server.orgs.inviteMemberOptions(queryClient),
  );

  const onSubmit = async (data: FormValues) => {
    try {
      await inviteMemberMutation.mutateAsync(data);
      form.reset();
      alert({
        title: "Invitation sent",
        description: `An invite was sent to ${data.email}.`,
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
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name={ICONS_ENUM.INVITE_USER} className="size-4" /> Invite
              new members by email address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-4">
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jane@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field: selectField }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Role*</FormLabel>
                    <Select
                      value={selectField.value}
                      onValueChange={selectField.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(__ROLES).map((role) => (
                          <SelectItem
                            key={role}
                            value={role}
                            className="capitalize"
                          >
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="py-2">
            <Button
              type="submit"
              className="ml-auto"
              isLoading={inviteMemberMutation.isPending}
            >
              Invite
              <Icon name={ICONS_ENUM.INVITE_USER} />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export { InviteMembers };
