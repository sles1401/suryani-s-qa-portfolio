import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  validateContact,
  submitContactMessage,
  type FieldErrors,
} from "@/lib/contact-validation";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError("");

    // 1. Client-side validation
    const clientCheck = validateContact(formData, t);
    if (clientCheck.ok === false) {
      setErrors(clientCheck.fieldErrors);
      setFormError(
        t(
          "Mohon perbaiki kolom yang ditandai di bawah.",
          "Please fix the highlighted fields below."
        )
      );
      return;
    }

    setIsSubmitting(true);

    // 2. Submission-layer validation (independent of form state) + send
    const result = await submitContactMessage(formData, t);
    setIsSubmitting(false);

    if (result.status === "invalid") {
      setErrors(result.fieldErrors);
      setFormError(result.formError);
      return;
    }

    setIsSubmitted(true);
    toast({
      title: t("Pesan terkirim!", "Message sent!"),
      description:
        result.delivery === "email"
          ? t(
              "Pesan Anda sudah dikirim ke email saya. Saya akan segera membalas.",
              "Your message has been delivered to my inbox. I'll get back to you soon."
            )
          : t(
              "Aplikasi email Anda dibuka untuk menyelesaikan pengiriman.",
              "Your email app was opened to finish sending the message."
            ),
    });
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Kontak", "Contact")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Hubungi Saya", "Get in Touch")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Punya pertanyaan atau ingin membahas peluang potensial? Saya dengan senang hati mendengar dari Anda.",
                "Have a question or want to discuss a potential opportunity? I'd be happy to hear from you."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="opacity-0 animate-fade-in-up">
              <SectionHeader
                label={t("Info Kontak", "Contact Info")}
                title={t("Mari Terhubung", "Let's Connect")}
                description={t(
                  "Silakan kirim email langsung atau gunakan formulir di halaman ini.",
                  "Send an email directly or use the form on this page."
                )}
              />

              <div className="space-y-6">
                <a 
                  href="mailto:suryanilestari123@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground break-all">suryanilestari123@gmail.com</p>
                  </div>
                </a>

              </div>

              <div className="mt-10 p-6 rounded-xl bg-accent/50 border border-primary/10">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {t("Waktu Respons", "Response Time")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Saya biasanya merespons pesan dalam 1-2 hari kerja. Untuk hal mendesak, silakan sebutkan di pesan Anda.",
                    "I typically respond to messages within 1-2 business days. For urgent matters, please indicate so in your message."
                  )}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="opacity-0 animate-fade-in-up animate-delay-200">
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  {t("Kirim Pesan", "Send a Message")}
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {t("Pesan Terkirim!", "Message Sent!")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(
                        "Terima kasih telah menghubungi. Saya akan segera membalas.",
                        "Thank you for reaching out. I'll get back to you soon."
                      )}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {formError && (
                      <div
                        role="alert"
                        data-testid="form-error"
                        className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-text"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {t("Nama Lengkap", "Full Name")} <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t("Nama Anda", "Your name")}
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`bg-background ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive-text flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("Alamat Email", "Email Address")} <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`bg-background ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive-text flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        {t("Subjek", "Subject")} <span className="text-muted-foreground text-sm">({t("opsional", "optional")})</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder={t("Tentang apa pesan ini?", "What is this about?")}
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t("Pesan", "Message")} <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("Apa yang ingin Anda sampaikan?", "What would you like to say?")}
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`bg-background resize-none ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive-text flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        t("Mengirim...", "Sending...")
                      ) : (
                        <>
                          {t("Kirim Pesan", "Send Message")}
                          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
