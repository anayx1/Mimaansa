"use client";

import React, { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

// Validation schema
const schema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    company: Yup.string().required("Company name is required"),
    country: Yup.string().required("Country is required"),
    productCategory: Yup.string().required("Product category is required"),
    role: Yup.string().required("Please select who you are"),
    message: Yup.string().required("Message is required"),
    consent: Yup.boolean()
        .oneOf([true], "You must consent before submitting")
        .required(),
});

export default function ContactSection() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const consentValue = watch("consent");
    const router = useRouter();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Request failed");

            setModalMessage("Form submitted successfully! Redirecting to homepage...");
            setModalSuccess(true);
            setModalOpen(true);

            reset();

            // Redirect after 5 seconds
            setTimeout(() => {
                setModalOpen(false);
                router.push("/");
            }, 5000);
        } catch (e) {
            console.error(e);
            setModalMessage("Failed to submit form. Please try again.");
            setModalSuccess(false);
            setModalOpen(true);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-primary relative">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Left image */}
                <div className="relative w-full h-[500px] md:h-auto">
                    <Image
                        src="/contactpage.jpg"
                        alt="Contact"
                        fill
                        quality={100}
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Right form */}
                <div className="p-6 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-5xl mb-6">
                        Let's work on your next big thing.
                    </h2>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 font-bold"
                    >
                        {/* Inputs */}
                        {[
                            { name: "fullName", placeholder: "Full Name" },
                            { name: "phone", placeholder: "Phone No." },
                            { name: "email", placeholder: "E-mail ID" },
                            { name: "company", placeholder: "Company Name" },
                            { name: "website", placeholder: "Website URL" },
                            { name: "country", placeholder: "Country" },
                        ].map(({ name, placeholder }) => (
                            <div key={name}>
                                <input
                                    {...register(name)}
                                    placeholder={placeholder}
                                    className="w-full border border-gray-300 p-3 rounded text-black placeholder:font-medium placeholder:text-gray-700 focus:border-black focus:ring-1 focus:ring-black outline-none"
                                />
                                {errors[name] && (
                                    <p className="text-red-500 text-sm font-normal">
                                        {errors[name]?.message}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Product Category */}
                        <div className="relative">
                            <select
                                {...register("productCategory")}
                                className="w-full border border-gray-300 p-3 rounded text-gray-700 font-medium appearance-none focus:border-black focus:ring-1 focus:ring-black outline-none"
                            >
                                <option value="">Product Category</option>
                                <option value="apparels">Apparels</option>
                                <option value="home-furniture">Home Furniture</option>
                                <option value="lifestyleaccessories">
                                    Lifestyle Accessories
                                </option>
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ">
                                <ChevronDown className="text-gray-600" />
                            </span>
                        </div>
                        {errors.productCategory && (
                            <p className="text-red-500 text-sm">
                                {errors.productCategory.message}
                            </p>
                        )}

                        {/* Role */}
                        <div className="relative">
                            <select
                                {...register("role")}
                                className="w-full border border-gray-300 p-3 rounded text-gray-700 font-medium appearance-none focus:border-black focus:ring-2 focus:ring-black outline-none"
                            >
                                <option value="">Who You Are?</option>
                                <option value="buyer">Buyer</option>
                                <option value="supplier">Supplier</option>
                            </select>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ">
                                <ChevronDown className="text-gray-600" />
                            </span>
                        </div>
                        {errors.role && (
                            <p className="text-red-500 text-sm">{errors.role.message}</p>
                        )}

                        {/* Message */}
                        <textarea
                            {...register("message")}
                            placeholder="Your Message"
                            rows="4"
                            className="w-full border border-gray-300 p-3 rounded text-black placeholder:font-medium placeholder:text-gray-700 focus:border-black focus:ring-2 focus:ring-black outline-none"
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-500 text-sm">{errors.message.message}</p>
                        )}

                        {/* Consent */}
                        <div className="flex items-center space-x-2">
                            <Checkbox.Root
                                className="flex h-6 w-6 items-center justify-center rounded border border-gray-400 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                checked={consentValue || false}
                                onCheckedChange={(checked) => setValue("consent", checked)}
                            >
                                <Checkbox.Indicator>
                                    <Check className="text-white p-1 " />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <span className="text-sm font-normal">
                                I consent to my details being stored and used in accordance.
                            </span>
                        </div>
                        {errors.consent && (
                            <p className="text-red-500 text-sm">{errors.consent.message}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center bg-black text-white py-3 rounded transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                                }`}
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                        <h3
                            className={`text-xl font-bold mb-2 ${modalSuccess ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {modalSuccess ? "Success" : "Error"}
                        </h3>
                        <p className="mb-4">{modalMessage}</p>
                        {!modalSuccess && (
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
