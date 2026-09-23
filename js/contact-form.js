document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const config = window.MUTHUVAL_CONFIG || {};
  const notifyEmail = config.notifyEmail || 'suresh@muthuvel.lifestyle';
  const formId = (config.formspreeFormId || '').trim();
  const endpoint = formId ? `https://formspree.io/f/${formId}` : '';

  const fields = form.querySelector('.contact-form-fields');
  const submitBtn = form.querySelector('.contact-form-submit');
  const btnLabel = submitBtn?.querySelector('.btn-label');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const successStatus = form.querySelector('.form-status--success');
  const errorStatus = form.querySelector('.form-status--error');
  const errorMessage = form.querySelector('.form-status-message');
  const successMessage = form.querySelector('.form-status-success');

  const setLoading = (loading) => {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.setAttribute('aria-busy', loading ? 'true' : 'false');
    if (btnLabel) btnLabel.hidden = loading;
    if (btnLoading) btnLoading.hidden = !loading;
  };

  const showStatus = (type, message) => {
    if (successStatus) successStatus.hidden = type !== 'success';
    if (errorStatus) errorStatus.hidden = type !== 'error';
    if (fields) fields.hidden = type === 'success';
    if (type === 'success' && successMessage && message) successMessage.textContent = message;
    if (type === 'error' && errorMessage && message) errorMessage.textContent = message;
    const banner = type === 'success' ? successStatus : errorStatus;
    if (banner) banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    if (data.get('_gotcha')) return;

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Collection enquiry from ${name}${company ? ` — ${company}` : ''}`;

    setLoading(true);
    if (successStatus) successStatus.hidden = true;
    if (errorStatus) errorStatus.hidden = true;

    if (!endpoint) {
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        phone ? `Phone: ${phone}` : '',
        interest ? `Interest: ${interest}` : '',
        '',
        message,
      ].filter(Boolean).join('\n');
      window.location.href = `mailto:${notifyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showStatus('success', 'Your email app should open with this enquiry. If it does not, write directly to suresh@muthuvel.lifestyle.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          interest,
          message,
          _subject: subject,
          _replyto: email,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        form.reset();
        showStatus('success', 'Thank you. Your enquiry has been sent. Our team will reply within 1–2 business days.');
      } else {
        const detail = result.errors?.map((err) => err.message).filter(Boolean).join(' ');
        showStatus('error', detail || `Please try again or email ${notifyEmail}.`);
      }
    } catch {
      showStatus('error', `The form could not be sent. Please email ${notifyEmail}.`);
    } finally {
      setLoading(false);
    }
  });
});
