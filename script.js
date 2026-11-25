// Responsive navigation menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = open ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// CV request settings: add your EmailJS credentials to enable email notifications.
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const OWNER_WHATSAPP = '254715537665';
const CV_LINK = 'https://charlie875.github.io/assets/documents/Charles-Kalungu-CV.pdf';

const form = document.getElementById('cvRequestForm');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('visitorName').value.trim();
    const email = document.getElementById('visitorEmail').value.trim();
    const phone = document.getElementById('visitorPhone').value.trim();
    const method = document.getElementById('deliveryMethod').value;
    const message = document.getElementById('visitorMessage').value.trim();
    const status = document.getElementById('formStatus');
    const button = document.getElementById('submitButton');
    const emailReady = !EMAILJS_PUBLIC_KEY.startsWith('YOUR_') &&
      !EMAILJS_SERVICE_ID.startsWith('YOUR_') &&
      !EMAILJS_TEMPLATE_ID.startsWith('YOUR_');

    if (method === 'email' || method === 'both') {
      if (emailReady && window.emailjs) {
        button.disabled = true;
        button.textContent = 'Sending request...';
        try {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            visitor_name: name, visitor_email: email, visitor_phone: phone,
            delivery_method: method, visitor_message: message || 'No additional message',
            cv_link: CV_LINK, to_email: 'kalungucharles9@gmail.com'
          });
          status.textContent = 'Your CV request has been sent by email.';
        } catch (err) {
          console.error(err);
          status.textContent = 'Email could not be sent. Please contact me directly by email or WhatsApp.';
        } finally {
          button.disabled = false;
          button.textContent = 'Submit CV request →';
        }
      } else {
        status.textContent = 'Email delivery is not configured yet. Please use the direct email or WhatsApp contact links.';
      }
    }

    if (method === 'whatsapp' || method === 'both') {
      const text = `Hello, I would like to request your CV.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred delivery: ${method}\nMessage: ${message || 'None'}\nCV link: ${CV_LINK}`;
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      status.textContent += ' WhatsApp has opened with your request. Press Send in WhatsApp to submit it.';
    }
  });
}
