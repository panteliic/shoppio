import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(5)
      .max(50, "Email must be up to 50 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(50, "Password can be up to 50 characters long.")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter and one number."
      ),
    confirm_password: z.string(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await fetch("http://localhost:5500/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="text-foreground bg-background w-screen h-screen flex items-center justify-center">
      <div className="text-secondary-foreground px-3 py-5 rounded w-3/4 flex flex-col gap-5 border-2 border-border md:w-1/2 lg:1/3 xl:w-1/4">
        <h1 className="text-3xl font-bold">Register</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@exapmle.com"
                        {...field}
                        type="email"
                      />
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
                      <Input
                        placeholder="Password..."
                        {...field}
                        type="password"
                      />
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password..."
                        {...field}
                        type="password"
                      />
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full p-5">
              Submit
            </Button>
          </form>
        </Form>
        <p>
          You already have an account?
          <a href="/account/login" className="text-blue-700 underline">
            Sign in.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
