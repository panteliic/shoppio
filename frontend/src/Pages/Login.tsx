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
import { useProvider } from "@/Context/Provider";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
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
});

interface User {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
}

function Login() {
  const provider = useProvider();
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response = await fetch("http://localhost:5500/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed: ' + response.statusText);
      }

      const userData: User = await response.json();
      provider.setUser(userData);
      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="text-foreground bg-background w-screen h-screen flex items-center justify-center">
      <div className="text-secondary-foreground px-3 py-5 rounded w-3/4 flex flex-col gap-5 border-2 border-border md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-3xl font-bold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@example.com" {...field} />
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
                    <FormLabel className="text-xl">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password..."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <a href="#" className="text-blue-700 underline">
                        Forget Password?
                      </a>
                    </FormDescription>
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
          Not signed up yet?{" "}
          <a href="/account/register" className="text-blue-700 underline">
            Register Now.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
