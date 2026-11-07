import { useEffect, useMemo, useState } from "react";
import { Play, Terminal, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useToast } from "@/hooks/use-toast";
import {
  ENDPOINTS,
  runSimulatedRequest,
  tokenizeJson,
  type HttpMethod,
  type SimResponse,
} from "@/lib/api-console";

const tokenClass: Record<string, string> = {
  key: "text-primary",
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-sky-600 dark:text-sky-400",
  bool: "text-amber-600 dark:text-amber-400",
  null: "text-muted-foreground",
  punct: "text-foreground/70",
};

const JsonView = ({ value }: { value: unknown }) => {
  const text = value === null ? "null" : JSON.stringify(value, null, 2);
  const tokens = useMemo(() => tokenizeJson(text ?? ""), [text]);
  return (
    <pre
      data-testid="response-body"
      className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 font-mono text-xs leading-relaxed"
    >
      <code>
        {tokens.map((tk, i) => (
          <span key={i} className={tokenClass[tk.kind]}>
            {tk.text}
          </span>
        ))}
      </code>
    </pre>
  );
};

const ApiConsole = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [endpointPath, setEndpointPath] = useState(ENDPOINTS[0].path);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer sim-token"\n}');
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<SimResponse | null>(null);
  const [sending, setSending] = useState(false);

  usePageMeta({
    title: "Mini API Console — Simulated API Testing | Suryani Lestari",
    description:
      "A simulated API console for practicing request methods, headers, payloads, and status codes — no network calls.",
    path: "/api-console",
  });

  const endpoint = ENDPOINTS.find((e) => e.path === endpointPath) ?? ENDPOINTS[0];

  useEffect(() => {
    if (!endpoint.methods.includes(method)) setMethod(endpoint.methods[0]);
  }, [endpoint, method]);

  const send = async () => {
    setSending(true);
    setResponse(null);
    await new Promise((r) => setTimeout(r, 350));
    setResponse(runSimulatedRequest(method, endpoint.path, headers, body));
    setSending(false);
  };

  const statusTone = (status: number) =>
    status < 300
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
      : status < 400
        ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/40"
        : "bg-destructive/15 text-destructive-text border-destructive/40";

  return (
    <PageLayout>
      <section className="py-16 lg:py-24 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6">
              <Terminal className="h-3.5 w-3.5" />
              {t("Modul Interaktif", "Interactive Module")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-5">
              {t("Mini API Console", "Mini API Console")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "Simulasi pengujian API: pilih metode HTTP dan endpoint, kirim header serta body JSON, lalu periksa response beserta status code dan waktu respons. Semua response disimulasikan secara lokal — tidak ada layanan nyata yang dipanggil.",
                "A simulated API testing sandbox: pick an HTTP method and endpoint, send JSON headers and a body, then inspect the response with its status code and timing. All responses are simulated locally — no real service is called."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Request builder */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                {t("Request", "Request")}
              </h2>

              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <div className="space-y-2">
                  <Label htmlFor="method">{t("Metode", "Method")}</Label>
                  <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
                    <SelectTrigger id="method" aria-label={t("Metode HTTP", "HTTP method")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {endpoint.methods.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint">{t("Endpoint", "Endpoint")}</Label>
                  <Select value={endpointPath} onValueChange={setEndpointPath}>
                    <SelectTrigger id="endpoint" aria-label={t("Endpoint simulasi", "Simulated endpoint")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ENDPOINTS.map((e) => (
                        <SelectItem key={e.path} value={e.path}>
                          {e.path}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="headers">{t("Headers (JSON)", "Headers (JSON)")}</Label>
                <Textarea
                  id="headers"
                  rows={4}
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  className="bg-background font-mono text-xs"
                  spellCheck={false}
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body">{t("Body (JSON)", "Body (JSON)")}</Label>
                  {endpoint.sampleBody && (
                    <button
                      type="button"
                      onClick={() => setBody(JSON.stringify(endpoint.sampleBody, null, 2))}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {t("Isi contoh", "Insert sample")}
                    </button>
                  )}
                </div>
                <Textarea
                  id="body"
                  rows={7}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={method === "GET" ? t("Tidak diperlukan untuk GET", "Not required for GET") : "{ }"}
                  className="bg-background font-mono text-xs"
                  spellCheck={false}
                />
              </div>

              <Button onClick={send} disabled={sending} className="mt-6 w-full" size="lg">
                <Play className="mr-2 h-4 w-4" />
                {sending ? t("Mengirim...", "Sending...") : t("Kirim Request", "Send Request")}
              </Button>
            </div>

            {/* Response panel */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {t("Response", "Response")}
                </h2>
                {response && (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      data-testid="response-status"
                      className={statusTone(response.status)}
                    >
                      {response.status} {response.statusText}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {response.durationMs} ms
                    </span>
                  </div>
                )}
              </div>

              {!response ? (
                <p className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
                  {sending
                    ? t("Menunggu response...", "Waiting for response...")
                    : t(
                        "Kirim request untuk melihat response di sini.",
                        "Send a request to see the response here."
                      )}
                </p>
              ) : (
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("Header Response", "Response Headers")}
                    </p>
                    <ul className="space-y-1 font-mono text-xs text-muted-foreground">
                      {Object.entries(response.headers).map(([k, v]) => (
                        <li key={k}>
                          <span className="text-primary">{k}</span>: {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("Body", "Body")}
                      </p>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        onClick={() => {
                          navigator.clipboard?.writeText(JSON.stringify(response.body, null, 2));
                          toast({ title: t("Response disalin", "Response copied") });
                        }}
                      >
                        <Copy className="h-3 w-3" />
                        {t("Salin", "Copy")}
                      </button>
                    </div>
                    <JsonView value={response.body} />
                  </div>
                </div>
              )}

              <p className="mt-6 text-xs text-muted-foreground">
                {t(
                  "Skenario yang tercakup: happy path, 400 JSON tidak valid, 401 tanpa Authorization, 422 body kosong, dan 204 pada DELETE.",
                  "Covered scenarios: happy path, 400 invalid JSON, 401 missing Authorization, 422 empty body, and 204 on DELETE."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ApiConsole;
