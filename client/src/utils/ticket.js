import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

const appUrl = import.meta.env.VITE_PUBLIC_APP_URL || window.location.origin;

const loadLogo = async () => {
  const response = await fetch('/logo.png');
  if (!response.ok) throw new Error('PACEFORGE logo is unavailable');
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('PACEFORGE logo could not be loaded'));
    reader.readAsDataURL(blob);
  });
};

export const getVerificationUrl = (registrationId) => (
  `${appUrl.replace(/\/$/, '')}/verify-registration/${encodeURIComponent(registrationId)}`
);

export const createQrCode = (registrationId) => QRCode.toDataURL(getVerificationUrl(registrationId), {
  errorCorrectionLevel: 'M',
  margin: 2,
  width: 320,
  color: { dark: '#050505', light: '#FFFFFF' }
});

const safeFilename = (value) => String(value || 'race').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error('Race date is invalid');
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'Asia/Kolkata' }).format(date);
};

export const generateRaceTicketPDF = async (registration) => {
  if (!registration?.registrationId || !registration.event?.title || !registration.event?.date) {
    throw new Error('Registration data is incomplete');
  }

  const qrCode = await createQrCode(registration.registrationId);
  const logo = await loadLogo();
  const pdf = new jsPDF({ format: 'a4', unit: 'mm' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const date = formatDate(registration.event.date);
  const participant = registration.participant || {};

  pdf.setFillColor('#050505');
  pdf.rect(0, 0, pageWidth, 297, 'F');
  pdf.setFillColor('#E10600');
  pdf.rect(0, 0, pageWidth, 6, 'F');
  pdf.setFillColor('#FF7200');
  pdf.rect(0, 291, pageWidth, 6, 'F');
  pdf.setTextColor('#FFFFFF');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.addImage(logo, 'PNG', 20, 10, 28, 15);
  pdf.text('PACEFORGE', 52, 25);
  pdf.setFontSize(9);
  pdf.setTextColor('#B8B8B8');
  pdf.text('TRAIN. TRACK. CONQUER.', 52, 32);
  pdf.setDrawColor('#FF7200');
  pdf.setLineWidth(1.5);
  pdf.line(20, 40, pageWidth - 20, 40);

  pdf.setTextColor('#FF7200');
  pdf.setFontSize(10);
  pdf.text('RACE REGISTRATION', 20, 54);
  pdf.setTextColor('#FFFFFF');
  pdf.setFontSize(22);
  pdf.text(registration.event.title, 20, 65, { maxWidth: pageWidth - 80 });
  pdf.setFontSize(11);
  pdf.setTextColor('#B8B8B8');
  pdf.text(`${date}  |  ${registration.event.venue || registration.event.location || 'Venue to be confirmed'}`, 20, 74, { maxWidth: pageWidth - 40 });

  pdf.setFillColor('#171717');
  pdf.roundedRect(20, 88, pageWidth - 40, 55, 3, 3, 'F');
  pdf.setTextColor('#FF7200');
  pdf.setFontSize(9);
  pdf.text('PARTICIPANT', 28, 101);
  pdf.setTextColor('#FFFFFF');
  pdf.setFontSize(18);
  pdf.text(participant.name || 'Participant', 28, 112);
  pdf.setFontSize(10);
  pdf.setTextColor('#B8B8B8');
  pdf.text(`Category: ${registration.category || 'Not specified'}`, 28, 123);
  pdf.text(`Distance: ${registration.distance || 'Not specified'}`, 28, 131);

  pdf.setTextColor('#FF7200');
  pdf.text('REGISTRATION', 28, 158);
  pdf.setTextColor('#FFFFFF');
  pdf.text(`Registration ID: ${registration.registrationId}`, 28, 169);
  pdf.text(`Booking ID: ${registration.bookingId || 'Not assigned'}`, 28, 178);
  pdf.text(`BIB: ${registration.bibNumber || 'Not assigned'}`, 28, 187);
  pdf.text(`Status: ${registration.status || 'PENDING'}`, 28, 196);
  pdf.setTextColor('#B8B8B8');
  pdf.text(`Payment: ${registration.paymentStatus || 'Not specified'}`, 28, 205, { maxWidth: 95 });
  pdf.text(`Registration Fee: INR ${Number(registration.amount || 0).toLocaleString('en-IN')}`, 28, 214, { maxWidth: 95 });

  pdf.addImage(qrCode, 'PNG', pageWidth - 78, 151, 52, 52);
  pdf.setFontSize(8);
  pdf.text('SCAN TO VERIFY REGISTRATION', pageWidth - 82, 210);

  pdf.setTextColor('#FF7200');
  pdf.setFontSize(9);
  pdf.text('VENUE', 20, 230);
  pdf.setTextColor('#FFFFFF');
  pdf.setFontSize(12);
  pdf.text(registration.event.venue || registration.event.location || 'Venue to be confirmed', 20, 240, { maxWidth: pageWidth - 40 });

  pdf.setDrawColor('#333333');
  pdf.line(20, 254, pageWidth - 20, 254);
  pdf.setTextColor('#FF7200');
  pdf.setFontSize(9);
  pdf.text('PACEFORGE SUPPORT', 20, 268);
  pdf.setTextColor('#B8B8B8');
  pdf.setFontSize(9);
  pdf.text('For registration assistance, contact the configured PACEFORGE support team.', 20, 276, { maxWidth: pageWidth - 40 });
  pdf.text(import.meta.env.VITE_PACEFORGE_SUPPORT_EMAIL || 'support@your-paceforge-domain.com', 20, 284);
  pdf.setTextColor('#FFFFFF');
  pdf.text('PACEFORGE  |  TRAIN. TRACK. CONQUER.', 20, 291);

  pdf.addPage();
  pdf.setFillColor('#050505');
  pdf.rect(0, 0, pageWidth, 297, 'F');
  pdf.setFillColor('#E10600');
  pdf.rect(0, 0, pageWidth, 6, 'F');
  pdf.setFillColor('#FF7200');
  pdf.rect(0, 291, pageWidth, 6, 'F');
  pdf.setTextColor('#FF7200');
  pdf.setFontSize(11);
  pdf.text('PAYMENT INVOICE', 20, 28);
  pdf.setTextColor('#FFFFFF');
  pdf.setFontSize(22);
  pdf.text('PACEFORGE RACE ENTRY', 20, 42);
  pdf.setDrawColor('#FF7200');
  pdf.line(20, 50, pageWidth - 20, 50);
  pdf.setFontSize(11);
  pdf.setTextColor('#B8B8B8');
  pdf.text(`Race: ${registration.event.title}`, 20, 68);
  pdf.text(`Invoice reference: ${registration.registrationId}`, 20, 78);
  pdf.text(`Payment source: ${registration.paymentSource || 'Mock payment'}`, 20, 88);
  pdf.text(`Payment status: ${registration.paymentStatus || 'Mock Payment Successful'}`, 20, 98);
  pdf.setTextColor('#FFFFFF');
  pdf.text(`Race price: INR ${Number(registration.amount || 0).toLocaleString('en-IN')}`, 30, 125);
  pdf.text(`GST: INR ${Number(registration.tax || 0).toLocaleString('en-IN')}`, 30, 137);
  pdf.text(`Extra charges: INR ${Number(registration.extraCharges || 0).toLocaleString('en-IN')}`, 30, 149);
  pdf.setTextColor('#FF7200');
  pdf.setFontSize(16);
  pdf.text(`Total paid: INR ${Number(registration.totalAmount || registration.amount || 0).toLocaleString('en-IN')}`, 30, 168);
  pdf.setTextColor('#B8B8B8');
  pdf.setFontSize(11);
  pdf.text(`Wallet portion: INR ${Number(registration.walletAmount || 0).toLocaleString('en-IN')}`, 30, 184);
  pdf.text(`Other source portion: INR ${Number(registration.externalAmount || 0).toLocaleString('en-IN')}`, 30, 196);
  pdf.setDrawColor('#333333');
  pdf.line(20, 220, pageWidth - 20, 220);
  pdf.setFontSize(9);
  pdf.text('This invoice records a mock project payment. No real funds were transferred.', 20, 238, { maxWidth: pageWidth - 40 });
  pdf.text('PACEFORGE  |  TRAIN. TRACK. CONQUER.', 20, 280);
  pdf.setTextColor('#666666');
  pdf.setFontSize(8);
  pdf.text('PAGE 2 OF 2', pageWidth - 48, 280);

  const filename = `PACEFORGE-${safeFilename(registration.event.title)}-${registration.registrationId}.pdf`;
  pdf.save(filename);
};

export const getGoogleCalendarUrl = (registration) => {
  const date = new Date(registration?.event?.date);
  if (!registration?.event?.date || Number.isNaN(date.getTime())) return null;
  const datePart = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(date).replaceAll('-', '');
  const end = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  const endPart = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(end).replaceAll('-', '');
  const description = [
    'PACEFORGE Race Registration',
    `Race: ${registration.event.title}`,
    `Category: ${registration.category || 'Not specified'}`,
    `Distance: ${registration.distance || 'Not specified'}`,
    `Registration ID: ${registration.registrationId}`,
    'PACEFORGE: Train. Track. Conquer.'
  ].join('\n');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `PACEFORGE - ${registration.event.title}`,
    dates: `${datePart}/${endPart}`,
    location: registration.event.location || '',
    details: description
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
