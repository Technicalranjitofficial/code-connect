"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loadToast, updateToast } from "@/utils/tostify";
import test from "node:test";
import { Editor } from "@monaco-editor/react";
import { Textarea } from "./ui/textarea";
import { addQuestion } from "@/ServerActions/actions";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string(),
    functionSignature_c: z.string(),
    functionSignature_cpp: z.string(),
    functionSignature_java: z.string(),
    testCases_input1: z.string(),
    testCases_output1: z.string(),
    testCases_input2: z.string(),
    testCases_output2: z.string(),
    executionFunction_c: z.string(),
    executionFunction_cpp: z.string(),
    executionFunction_java: z.string(),

});

const AddQuestion = () => {
    // const router = useRouter();
    // const [loading, setLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            functionSignature_c: "",
            functionSignature_cpp: "",
            functionSignature_java: "",
            testCases_input1: "",
            testCases_output1: "",
            testCases_input2: "",
            testCases_output2: "",
            executionFunction_c: "",
            executionFunction_cpp: "",
            executionFunction_java: "",
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // setLoading(true);

        
        const data:{
            title:string,
            description:string,
            functionSignature_c:string,
            functionSignature_cpp:string,
            functionSignature_java:string,
            testCases_input1:string,
            testCases_output1:string,
            testCases_input2:string,
            testCases_output2:string,
            executionFunction_c:string,
            executionFunction_cpp:string,
            executionFunction_java:string,
        } = {
            title:values.title,
            description:values.description,
            functionSignature_c:values.functionSignature_c,
            functionSignature_cpp:values.functionSignature_cpp,
            functionSignature_java:values.functionSignature_java,
            testCases_input1:values.testCases_input1,
            testCases_output1:values.testCases_output1,
            testCases_input2:values.testCases_input2,
            testCases_output2:values.testCases_output2,
            executionFunction_c:values.executionFunction_c,
            executionFunction_cpp:values.executionFunction_cpp,
            executionFunction_java:values.executionFunction_java,
        };

        const requestData={
            title:data.title,
            description:data.description,
            functionSignature:{
                "c":data.functionSignature_c,
                "c++":data.functionSignature_cpp,
                "java":data.functionSignature_java,
            },
            testCases:[
                {
                    input:data.testCases_input1,
                    expectedOutput:data.testCases_output1
                },
                {
                    input:data.testCases_input2,
                    expectedOutput:data.testCases_output2
                }
            
            ],

            executionFunction:{
                "c":data.executionFunction_c,
                "c++":data.executionFunction_cpp,
                "java":data.executionFunction_java,
            }
        }
    

        console.log(requestData);

        const res = await addQuestion(requestData);

        console.log("res:",res);






    };

    return (
        <div className="pt-28">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 p-4 border border-gray-600 rounded-md"
                >
                    <div className="flex flex-col gap-2">
                        <p className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient mb-2">
                            Premium Subscription (Rs. / Semetser)
                        </p>
                        <p className="text-muted-foreground">
                            We are not asking for large amount. We have to run the server
                            which is more costly.So get the subscription at just{" "}
                            <span className="text-green-500"> Rs  Per Semester.</span>
                        </p>
                    </div>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Problem Statement.."
                                        {...field}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description Here." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="functionSignature_c"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fun-c:</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Function signature here" {...field} /> */}

                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="c"
                                        defaultValue="// some comment"

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />  <FormField
                        control={form.control}
                        name="functionSignature_cpp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fun-cpp:</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Function signature here" {...field} /> */}
                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="cpp"
                                        defaultValue="// some comment"

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />  <FormField
                        control={form.control}
                        name="functionSignature_java"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fun-Jave:</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Function signature here" {...field} /> */}
                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="java"
                                        defaultValue="// some comment"

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />





                    <FormField
                        control={form.control}
                        name="testCases_input1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>TestCase Input -1:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="T-1 input" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="testCases_output1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>TestCase output -1:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="T-1 output" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="testCases_input2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>TestCase Input -2:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="T-2 input" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="testCases_output2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>TestCase Output -2:</FormLabel>
                                <FormControl>
                                    <Input placeholder="T-2 output" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="executionFunction_c"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Execution Function -c</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Execution Function..." {...field} /> */}

                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="c"
                                        defaultValue="// some comment"
                                    />




                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="executionFunction_cpp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Execution Function -cpp</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Execution Function..." {...field} /> */}

                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="cpp"
                                        defaultValue="// some comment"

                                    />
                                </FormControl>
                                </FormItem>
                        )}

                    />

                    <FormField
                        control={form.control}
                        name="executionFunction_java"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Execution Function -java</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Execution Function..." {...field} /> */}

                                    <Editor
                                        height="20vh"
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultLanguage="java"
                                        defaultValue="// some comment"

                                    />
                                </FormControl>
                                </FormItem>
                        )}


                    />


                    <button
                        type="submit"
                        className="py-2.5 px-5 me-2 text-sm font-medium text-gray-100 bg-green-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700     inline-flex items-center"
                    >
                        Add Question
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default AddQuestion;
