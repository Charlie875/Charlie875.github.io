# Charles N. Kalungu — Portfolio Website

## Included
- `index.html` — portfolio sections based on the supplied CV
- `style.css` — responsive design
- `script.js` — navigation and CV request form
- `assets/documents/Charles-Kalungu-CV.pdf` — your uploaded four-page CV

The Education section includes **Master of Science in Applied Mathematics**, Masinde Muliro University of Science and Technology (MMUST), **September 2026 – Present**.

## Publish on GitHub Pages
1. Sign in to GitHub as `Charlie875`.
2. Open the repository `Charlie875.github.io`.
3. Upload the contents of this folder to the repository root. Keep the `assets/documents` folder structure.
4. Commit to the `main` branch.
5. Open Settings → Pages. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
6. Visit https://charlie875.github.io/ after deployment completes.

## Activate email delivery (EmailJS)
The form collects the visitor's full name, email address, phone/WhatsApp number and preferred delivery method. Email delivery is inactive until you configure EmailJS:
1. Create an account at https://www.emailjs.com/.
2. Add an email service connected to the mailbox you want to send from.
3. Create an email template. Set its **To email** field to `{{to_email}}`.
4. Include these template variables: `{{visitor_name}}`, `{{visitor_phone}}`, `{{cv_link}}`, `{{visitor_message}}`.
5. Find your EmailJS Public Key, Service ID and Template ID.
6. Edit `script.js` in GitHub and replace `YOUR_EMAILJS_PUBLIC_KEY`, `YOUR_EMAILJS_SERVICE_ID`, and `YOUR_EMAILJS_TEMPLATE_ID` with your actual values.
7. Commit the changes and test with an email address you can access.

Suggested email template:

Subject: Your requested CV — Charles N. Kalungu

Hello {{visitor_name}},

Thank you for requesting my curriculum vitae. View and download the PDF here:
{{cv_link}}

Kind regards,
Charles N. Kalungu

The email sends a link to the hosted PDF, not a PDF attachment.

## WhatsApp delivery
The WhatsApp choice opens a pre-filled message to `+254 715 537 665`. The visitor must press **Send** in WhatsApp. You can then reply and share the PDF. With **Both**, the visitor receives the CV link by email after EmailJS is configured and can also send you a WhatsApp request.

Fully automatic WhatsApp PDF delivery requires the official WhatsApp Business Platform/API, a backend, approved message templates and potentially paid messaging. Never put WhatsApp API tokens or other secret keys in this public GitHub repository.

## Add a profile photograph
The design currently uses a CK monogram. To add a photo, upload it as `assets/images/charles-kalungu.jpg`, replace `<div class="monogram">CK</div>` in `index.html` with:

```html
<img class="profile-photo" src="assets/images/charles-kalungu.jpg" alt="Professional photograph of Charles N. Kalungu">
```

Then add to `style.css`:

```css
.profile-photo { width:160px; height:160px; border-radius:50%; object-fit:cover; border:8px solid #ffffff26; }
```

## Privacy
The PDF is publicly accessible without submitting the form. Contact details entered in the form are sent through EmailJS only after configuration. Do not upload identity documents, signatures, confidential institutional records or sensitive personal information.
