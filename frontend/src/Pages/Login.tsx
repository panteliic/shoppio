import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="text-foreground bg-background w-screen h-screen flex items-center justify-center">
      <div className="text-secondary-foreground px-3 py-5 rounded w-1/4 flex flex-col gap-5 border-2 border-border">
        <h1 className="text-xl font-bold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5">
              {" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@exapmle.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Paassword</FormLabel>
                    <FormControl>
                      <Input placeholder="Password..." {...field} />
                    </FormControl>
                    <FormDescription>
                      <a href="#" className="text-blue-700 underline">Forget Password?</a>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full p-5">Submit</Button>
          </form>
        </Form>
        <p>Not signed up yet? <a href="/account/register" className="text-blue-700 underline">Register Now.</a></p>
      </div>
    </div>
  );
}

export default Login;
