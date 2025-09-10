'use client'
import {
    Mail, Send, MessageSquare, Github, Twitter, Linkedin, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

export default function ContactPage() {
    const { data: session } = useSession()
    const [form, setForm] = useState({ name: `${session?.user?.name}`, email: `${session?.user?.email}`, topic: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        try {
            // TODO: replace with your API call
            await new Promise((r) => setTimeout(r, 1000));
            setStatus("success");
            setForm({ name: "", email: "", topic: "", message: "" });
        } catch {
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 2500);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Contact</p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900">
                            We’re here to help
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                            Reach out for product support, partnerships, or feedback. We reply within 24 hours.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">

                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
                        >
                            <Twitter size={16} /> Twitter
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ranjit-das-31b866352/"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
                        >
                            <Linkedin size={16} /> LinkedIn
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Contact methods */}
                    <aside className="space-y-4 lg:col-span-1">
                        <ContactCard
                            icon={<Mail className="text-emerald-600" size={18} />}
                            title="Email"
                            value="ranjitdas2048@gmail.com"
                            hint=""
                        />


                    </aside>

                    {/* Form */}
                    <section className="lg:col-span-2">
                        <div className="rounded-2xl border border-zinc-100 bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
                            <div className="mb-5 flex items-center gap-2">
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                                        Send us a message
                                    </h2>
                                    <p className="text-sm text-zinc-600">We usually respond within 24 hours.</p>
                                </div>
                            </div>

                            {/* Status banners */}
                            {status === "success" && (
                                <Banner type="success" text="Message sent! We’ll get back to you shortly." />
                            )}
                            {status === "error" && (
                                <Banner type="error" text="Something went wrong. Please try again." />
                            )}

                            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field
                                    label="Name"
                                    id="name"
                                    value={form.name}
                                    onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                                    placeholder="Jane Doe"
                                />
                                <Field
                                    label="Email"
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                                    placeholder="jane@company.com"
                                />
                                <Field
                                    label="Topic"
                                    id="topic"
                                    value={form.topic}
                                    onChange={(v) => setForm((p) => ({ ...p, topic: v }))}
                                    placeholder="Product feedback"
                                    className="sm:col-span-2"
                                />
                                <Field
                                    label="Message"
                                    id="message"
                                    value={form.message}
                                    onChange={(v) => setForm((p) => ({ ...p, message: v }))}
                                    placeholder="Tell us a bit more…"
                                    textarea
                                    rows={6}
                                    className="sm:col-span-2"
                                />

                                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-80"
                                    >
                                        {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                        Send message
                                    </button>
                                    <span className="text-xs text-zinc-500">
                                        By submitting, agrees to our terms and privacy policy.
                                    </span>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
}

function ContactCard({
    icon,
    title,
    value,
    hint,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="rounded-2xl border border-zinc-100 bg-white/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900">{title}</p>
                    <p className="truncate text-sm text-zinc-600">{value}</p>
                    <p className="mt-1 text-xs text-zinc-500">{hint}</p>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    id,
    value,
    onChange,
    placeholder,
    type = "text",
    textarea = false,
    rows = 4,
    className = "",
}: {
    label: string;
    id: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    textarea?: boolean;
    rows?: number;
    className?: string;
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
                {label}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
            )}
        </div>
    );
}

function Banner({ type, text }: { type: "success" | "error"; text: string }) {
    const isSuccess = type === "success";
    return (
        <div
            role="status"
            className={`mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ring-1 ${isSuccess
                    ? "bg-emerald-50 text-emerald-800 ring-emerald-100"
                    : "bg-rose-50 text-rose-800 ring-rose-100"
                }`}
        >
            {isSuccess ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {text}
        </div>
    );
}



