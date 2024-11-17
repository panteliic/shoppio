import Nav from "@/Components/Nav";
import Summary from "@/Components/Summary";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
  FormField,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { useCart } from "@/Context/CartProvider";
import { useProvider } from "@/Context/Provider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import api from "@/api";
const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(5)
    .max(50, "Email must be up to 50 characters."),
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  address: z.string().min(2),
});

function Checkout() {
  const provider = useProvider();
  const cart = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      address: "",
    },
  });
  useEffect(() => {
    if (provider.user) {
      form.reset({
        email: provider.user.email || "",
        firstname: provider.user.firstname || "",
        lastname: provider.user.lastname || "",
        address: provider.user.address || "",
      });
    }
  }, [provider.user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch("http://localhost:5500/api/send-mail", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          address: values.address,
          products: cart.cart,
          total: cart.totalPrice,
        }),
      });
      form.reset();
      localStorage.removeItem("cart");
      cart.setCart([]);
      await api.post("/api/removeCart",{
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Nav />
      <div className=" container m-auto w-full rounded p-5 flex flex-col-reverse lg:flex-row items-start gap-5 shadow-xl my-5 ">
        <div className="w-full lg:w-3/4 flex flex-col gap-5">
          <h1 className="text-xl font-bold mb-4">Checkout</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="firstname"
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
                  name="lastname"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">Adress</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address..."
                          {...field}
                          type="text"
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
        </div>
        <Summary visible={false} />
      </div>
    </div>
  );
}

export default Checkout;
