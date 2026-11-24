// Configure EmailJS values below after creating your account. See README.md.
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const OWNER_WHATSAPP = "254715537665";
const CV_LINK = "https://charlie875.github.io/assets/documents/Charles-Kalungu-CV.pdf";

const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("cvRequestForm");
const status = document.getElementById("formStatus");
const button = document.getElementById("submitButton");
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const f = new FormData(form);
  const name = String(f.get("visitorName")).trim();
  const email = String(f.get("visitorEmail")).trim();
  const phone = String(f.get("visitorPhone")).trim();
  const method = String(f.get("deliveryMethod"));
  const message = String(f.get("visitorMessage") || "").trim();
  const wantsEmail = method === "email" || method === "both";
  const wantsWhatsApp = method === "whatsapp" || method === "both";
  button.disabled = true; button.textContent = "Processing request…"; status.textContent = "";

  if (wantsWhatsApp) {
    const text = ["Hello Charles, I would like to request your CV.", `Name: ${name}`, `Email: ${email}`, `WhatsApp: ${phone}`, `Delivery preference: ${method}`, message ? `Message: ${message}` : ""].filter(Boolean).join("\n");
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }
  const configured = ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(x => x.startsWith("YOUR_"));
  let sent = false;
  if (wantsEmail && configured && window.emailjs) {
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { to_email: email, visitor_name: name, visitor_phone: phone, cv_link: CV_LINK, visitor_message: message });
      sent = true;
    } catch (error) { console.error(error); }
  }
  if (wantsEmail && sent && wantsWhatsApp) status.textContent = "The CV link has been emailed to you. WhatsApp has opened with your request; press Send, and Charles can also share the PDF there.";
  else if (wantsEmail && sent) status.textContent = "The CV link has been emailed to you. Check your inbox and spam folder.";
  else if (wantsEmail && !configured) status.textContent = "Email is not activated yet. The website owner must configure EmailJS using the README instructions. The WhatsApp request has been opened if selected.";
  else if (wantsEmail) status.textContent = "Email delivery failed. Please check the EmailJS settings or use the direct PDF link on this page.";
  else status.textContent = "WhatsApp has opened with your request. Press Send in WhatsApp to submit it to Charles.";
  button.disabled = false; button.textContent = "Submit CV request →";
});
