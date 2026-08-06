import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  submitContactMessage,
  type FieldErrors,
} from "@/lib/contact-validation";

const FooterContactForm = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    const result = await submitContactMessage(values, t);
    setSending(false);
    if (result.status === "invalid") {
      setErrors(result.fieldErrors);
      setFormError(result.formError);
      return;
    }
    setErrors({});
    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/40 p-5"
      >
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-foreground/90 leading-relaxed">
          {t(
            "Terima kasih! Pesan Anda sudah terkirim. Saya akan membalas melalui email.",
            "Thank you! Your message has been sent. I'll reply by email."
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 min-w-0">
          <Label htmlFor="footer-name">{t("Nama", "Name")}</Label>
          <Input
            id="footer-name"
            value={values.name}
            onChange={onChange("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "footer-name-error" : undefined}
          />
          {errors.name && (
            <p id="footer-name-error" className="text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1.5 min-w-0">
          <Label htmlFor="footer-email">{t("Email", "Email")}</Label>
          <Input
            id="footer-email"
            type="email"
            value={values.email}
            onChange={onChange("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "footer-email-error" : undefined}
          />
          {errors.email && (
            <p id="footer-email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-1.5 min-w-0">
        <Label htmlFor="footer-message">{t("Pesan", "Message")}</Label>
        <Textarea
          id="footer-message"
          rows={4}
          value={values.message}
          onChange={onChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "footer-message-error" : undefined}
        />
        {errors.message && (
          <p id="footer-message-error" className="text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        {sending ? (
          <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="mr-2 h-4 w-4" />
        )}
        {sending ? t("Mengirim...", "Sending...") : t("Kirim Pesan", "Send Message")}
      </Button>
    </form>
  );
};

export default FooterContactForm;