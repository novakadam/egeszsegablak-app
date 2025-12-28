import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sendContactMessage } from "@/lib/wpApi";

const ContactPage = () => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // honeypot (hidden) – botok szokták kitölteni
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const n = String(name || "").trim();
    const em = String(email || "").trim();
    const msg = String(message || "").trim();

    if (n.length < 2) {
      toast({ title: "Hiányzó adat", description: "Kérlek add meg a neved." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(em)) {
      toast({ title: "Hibás email", description: "Kérlek valós email címet adj meg." });
      return;
    }
    if (msg.length < 5) {
      toast({ title: "Hiányzó üzenet", description: "Kérlek írd le az üzeneted." });
      return;
    }

    try {
      setSubmitting(true);

      await sendContactMessage({
        name: n,
        email: em,
        message: msg,
        website, // honeypot
      });

      toast({
        title: "Üzenet elküldve",
        description: "Köszönjük! Hamarosan válaszolunk.",
      });

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Hiba történt",
        description:
          err?.message ||
          "Nem sikerült elküldeni az üzenetet. Kérlek próbáld újra később.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Kapcsolat - Egészségablak</title>
        <meta name="description" content="Lépj kapcsolatba velünk!" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#3B4A8C] via-[#4A5FA8] to-[#3B4A8C]">
        <Header />

        <main className="pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-8 text-center">
              Kapcsolat
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Küldd el üzeneted</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Neved"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    autoComplete="name"
                  />

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email címed"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    autoComplete="email"
                  />

                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Üzeneted"
                    rows={5}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />

                  {/* Honeypot – legyen hidden, de a DOM-ban maradjon */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#7FD8BE] hover:bg-[#6BC7AD] text-white disabled:opacity-70"
                  >
                    {submitting ? "Küldés folyamatban…" : "Küldés"}
                  </Button>
                </form>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-medium text-white mb-6">Elérhetőségeink</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#7FD8BE] mt-1" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-white/70">info@egeszsegablak.hu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#7FD8BE] mt-1" />
                    <div>
                      <p className="text-white font-medium">Telefon</p>
                      <p className="text-white/70">+36 1 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#7FD8BE] mt-1" />
                    <div>
                      <p className="text-white font-medium">Cím</p>
                      <p className="text-white/70">1234 Budapest, Példa utca 12.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-white/50 text-sm mt-10">
              (Ha a levelek nem érkeznek meg, a WP oldalon valószínűleg SMTP beállítás kell.)
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
